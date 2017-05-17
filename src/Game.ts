class Game {

    frameClock: any;
    startFrameTimer: any;
    framesPerSecond: number;
    ticksPerSecond: number;
    renderer: Renderer;
    seed: number;
    player: Player;
    world: World;
    worldStack: World[];
    state: GameState;
    settings: GameSettings;
    gameLog: string[];
    menu: Menu;

    constructor(renderer: Renderer, seed: number, settings: GameSettings) {
        this.renderer = renderer;
        this.renderer.game = this; // set up a reference
        this.seed = seed;
        this.settings = settings;

        this.frameClock = null;

        this.framesPerSecond = GameDefault.FramesPerSecond;
        this.ticksPerSecond = GameDefault.TicksPerSecond;



        // Add a Player to the first room with a reference back to this game
        this.player = new Player(this);

        this.world = null;
        this.worldStack = [];

        this.state = GameState.NotStarted;

        // Initialize the renderer
        this.renderer.init();

        this.gameLog = ['You enter the dungeon'];

        // Helpers
        this.startFrameTimer = (game: Game) => {
            game.frameClock = setInterval(() => {
                game.frameTick(game);
            },
                (1 / game.framesPerSecond) * 1000);
        };

        // Menus
        this.menu = MainMenu;
        this.menu.linkToGame(this);

    }

    saveSettings() {
        GameSettingsProvider.saveSettings(this.settings);
    }

    start() {
        this.state = GameState.Playing;
        this.startFrameTimer(this);
        //Tick once
        this.gameTick(this);
    }

    pause() {
        this.state = GameState.Paused;
    }

    unpause() {
        this.state = GameState.Playing;
    }

    log(text: string) {
        this.gameLog.push(text);
    }

    getLastLog() {
        return this.gameLog.last();
    }

    frameTick(game: Game) {
        // Get player location and pass to the renderer to center on
        var centerPoint = game.player.location;
        if (centerPoint === null) {
            centerPoint = new Point(Math.floor(game.world.width / 2), Math.floor(game.world.height / 2));
        }
        game.renderer.drawFrame(game.world, centerPoint);
    }

    gameTick(game: Game) {
        if (this.state !== GameState.Paused) {
            var actorsToTick = this.getTickableActors();
            for (var a = 0; a < actorsToTick.length; a++) {
                actorsToTick[a].tick();
            }
        }
    }

    getTickableActors() {
        var tickableActors = [];
        if (this.world !== null) {
            var actor = null;
            for (var l = 0; l < this.world.layers.length; l++) {
                for (var y = 0; y < this.world.layers[l].tiles.length; y++) {
                    for (var x = 0; x < this.world.layers[l].tiles[y].length; x++) {
                        actor = this.world.layers[l].getTile(x, y);
                        if (actor instanceof Actor && actor.doesSubscribeToTicks) {
                            tickableActors.push(actor);
                        }
                    }
                }
            }
        }

        // Place player first
        var player = null;
        for (var actor of tickableActors) {
            if (actor instanceof Player) {
                player = actor;
                tickableActors.remove(player);
            }
        }
        if (player !== null) {
            tickableActors.unshift(player);
        }

        return tickableActors;
    }

    controlPressed(control: Control) {
        // PAUSED
        if (this.state === GameState.Paused) {
            if (control === Control.UpArrow) {
                this.menu.navUp();
            }

            if (control === Control.DownArrow) {
                this.menu.navDown();
            }

            if (control === Control.Enter || control === Control.Space) {
                this.menu.executeCurrentOption();
            }

            if (control === Control.Backspace) {
                this.menu.goBackAPage();
            }

            if (control === Control.Escape) {
                this.unpause();
                this.menu.resetNavStack();
            }
            return;
        }

        // PLAYING
        if (this.state === GameState.Playing) {
            // Arrows
            if ([Control.UpArrow, Control.DownArrow, Control.LeftArrow, Control.RightArrow].contains(control)) {

                // If we're not moving, issue a new move
                if (!this.player.isMoving()) {
                    var directionToMove = Movement.ControlArrowToDirection(control);
                    var offset = Movement.DirectionToOffset(directionToMove);
                    var resultLocation = Movement.AddPoints(this.player.location, offset);
                    this.player.addCommand(
                        new MoveTo(this.player, resultLocation)
                    );
                }

                // Regardless, tick once
                this.gameTick(this);
            }

            if (control === Control.Escape) {
                this.pause();
            }

            if (control === Control.P) {
                this.player.tryUseInventory(Potion);
            }

            return;
        }
    }

    setRandomDungeon() {
        console.log('Generating dungeon with seed "' + this.seed + '"');
        this.seed++;

        // Generate the dungeon
        var settings = new WorldGeneratorSettings();
        settings.totalWidth = 75;
        settings.totalHeight = 75;
        settings.minRoomWidth = 3;
        settings.maxRoomWidth = 20;
        settings.minRoomHeight = 3;
        settings.maxRoomHeight = 20;
        settings.minNumRooms = 24;
        settings.maxNumRooms = 120;
        settings.minHallThickness = 1;
        settings.maxHallThickness = 5;
        settings.retryAttempts = 1000;
        settings.floorActorType = Floor;
        this.world = WorldGenerator.GenerateCarvedWorld(
            this.seed,  // seed,
            settings,   // settings,
            this        // forward on the reference to this game instance
        );

        // Decorate it
        var decoratorSettings = new WorldDecoratorSettings();
        var decorator = new WorldDecorator(decoratorSettings, this.seed);
        decorator.decorate(this.world);

        // Pass a reference to the world so the player can navigate it
        this.player.world = this.world;

        var mainLayer = this.world.layers.filter(function(layer) {
            return layer.type == LayerType.Wall;
        }).first();
        var starterRoomCenter = this.world.rooms.first().getCenter();
        var lastRoomCenter = this.world.rooms.last().getCenter();

        var spawnLocation = new Point(starterRoomCenter.x, starterRoomCenter.y);
        var exitLocation = new Point(lastRoomCenter.x, lastRoomCenter.y);

        // Drop the stairs we just took down into the center of the rooms
        var stairsUp = new StairsUp(this);
        mainLayer.placeActor(stairsUp, spawnLocation);
        mainLayer.placeActor(this.player, Movement.AddPoints(spawnLocation, new Point(0, 1)));

        // Sample Torch
        var torch = new Torch(this);//, 0xFFA200);
        mainLayer.placeActor(torch, Movement.AddPoints(spawnLocation, new Point(0, -1)));
        var torch2 = new Torch(this;//, 0x005EFF);
        mainLayer.placeActor(torch2, Movement.AddPoints(spawnLocation, new Point(0, -5)));

        var exit = new StairsDown(this);
        mainLayer.placeActor(exit, exitLocation);

        // Throw in some demo enemies protecting the exit
        var chaser = new Chaser(this);
        mainLayer.placeActor(chaser, exitLocation.offsetBy(1, 1));
        var chaser2 = new Chaser(this);
        mainLayer.placeActor(chaser2, exitLocation.offsetBy(0, 1));
        var chaser3 = new Chaser(this);
        mainLayer.placeActor(chaser3, exitLocation.offsetBy(1, 0));
        var chaser4 = new Chaser(this);
        mainLayer.placeActor(chaser4, exitLocation.offsetBy(-1, -1));
        var chaser5 = new Chaser(this);
        mainLayer.placeActor(chaser5, exitLocation.offsetBy(-1, 0));
        var chaser6 = new Chaser(this);
        mainLayer.placeActor(chaser6, exitLocation.offsetBy(0, -1));
        var chaser7 = new Chaser(this);
        mainLayer.placeActor(chaser7, exitLocation.offsetBy(1, -1));
        var chaser8 = new Chaser(this);
        mainLayer.placeActor(chaser8, exitLocation.offsetBy(-1, 1));

        var demoChest = new Chest(this, [new Potion()]);
        mainLayer.placeActor(demoChest, this.world.rooms.second().getCenter());

    }

}
