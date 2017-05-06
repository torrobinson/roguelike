class Game{
  constructor(renderer,seed){
    this.renderer = renderer;
    this.renderer.game = this; // set up a reference

    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 30; //20 might be reasonable
    this.tickClock = null;
    this.ticksPerSecond = 20;

    // Add a Player to the first room with a reference back to this game
    this.player = new Player(this);

    this.world = null;

    // Initialize the renderer
    this.renderer.init();

    // Helpers
    this.startFrameTimer = function (game){
        game.frameClock= setInterval(function() {
          game.frameTick(game);
        },
        (1/game.framesPerSecond)*1000);
    };
  }

    start(){
      this.startFrameTimer(this);
      //Tick once
      this.gameTick(this);
    }

    pause(){
        clearInterval(this.frameClock);
    }

    frameTick(game) {
         // Get player location and pass to the renderer to center on
         var centerPoint = game.player.location;
         if(centerPoint === null){
           centerPoint = new Point(Math.floor(game.world.width/2), Math.floor(game.world.height/2));
         }
         game.renderer.drawFrame(game.world, centerPoint);
     }

     gameTick(game){
       var actorsToTick = this.getTickableActors();
       for(var a=0;a<actorsToTick.length;a++){
         actorsToTick[a].tick();
       }
     }

     getTickableActors(){
       var tickableActors = [];
       if(this.world!==null){
         var actor = null;
         for(var l=0;l<this.world.layers.length;l++){
           for(var y=0;y<this.world.layers[l].tiles.length;y++){
             for(var x=0;x<this.world.layers[l].tiles[y].length;x++){
               actor = this.world.layers[l].getTile(x,y);
               if(actor instanceof Actor && actor.doesSubscribeToTicks){
                 tickableActors.push(actor);
               }
             }
           }
         }
       }

       // Place player first
       var player = null;
       for(var actor of tickableActors){
         if(actor instanceof Player){
           player = actor;
           tickableActors.remove(player);
         }
       }
       if(player !== null){
         tickableActors.unshift(player);
       }

       return tickableActors;
     }

    controlPressed(control){

        // Arrows
        if([Controls.UpArrow,Controls.DownArrow,Controls.LeftArrow,Controls.RightArrow].contains(control)){
            if(this.player.isMoving() === false){
                // Check if paused, check if blah, blah blah, for now, just move the player.
                var directionToMove = Movement.ControlArrowToDirection(control);
                var offset = Movement.DirectionToOffset(directionToMove);
                var resultLocation = Movement.AddPoints(this.player.location, offset);
                this.player.addCommand(
                  new MoveTo(this.player,resultLocation)
                );
            }
        }
        if(control == Controls.Attack){
          // TODO: attack command
        }

        this.gameTick(this);
    }

    setRandomDungeon(){

        this.player.clearCommands();

        this.seed++;

        // Generate the dungeon
        var settings = new GenerateCarvedWorldSettings();
        settings.totalWidth = 50;
        settings.totalHeight = 50;
        settings.minRoomWidth = 3;
        settings.maxRoomWidth = 12;
        settings.minRoomHeight = 3;
        settings.maxRoomHeight = 12;
        settings.minNumRooms = 6;
        settings.maxNumRooms = 120;
        settings.minHallThickness = 1;
        settings.maxHallThickness = 3;
        settings.retryAttempts = 1000;
        settings.floorActorType = Floor;

        this.world = WorldGenerator.GenerateCarvedWorld(
            this.seed,  // seed,
            settings,   // settings,
            this        // forward on the reference to this game instance
        );
        // Pass a reference to the world so the player can navigate it
        this.player.world = this.world;

        var mainLayer = this.world.layers.filter(function(layer){
          return layer.type == LayerType.Wall;
        }).first();
        var starterRoomCenter = this.world.rooms.first().getCenter();
        var lastRoomCenter = this.world.rooms.last().getCenter();

        var spawnLocation = new Point(starterRoomCenter.x, starterRoomCenter.y);
        var exitLocation = new Point(lastRoomCenter.x, lastRoomCenter.y);

        mainLayer.placeActor(this.player, spawnLocation);

        var exit = new StairsDown(this);
        mainLayer.placeActor(exit, exitLocation);

        // Throw in some demo enemies protecting the exit
        var chaser = new Chaser(this);
        mainLayer.placeActor(chaser, exitLocation.offsetBy(1,1));
        var chaser2 = new Chaser(this);
        mainLayer.placeActor(chaser2, exitLocation.offsetBy(0,1));
        var chaser3 = new Chaser(this);
        mainLayer.placeActor(chaser3, exitLocation.offsetBy(1,0));
        var chaser4 = new Chaser(this);
        mainLayer.placeActor(chaser4, exitLocation.offsetBy(-1,-1));
        var chaser5 = new Chaser(this);
        mainLayer.placeActor(chaser5, exitLocation.offsetBy(-1,0));
        var chaser6 = new Chaser(this);
        mainLayer.placeActor(chaser6, exitLocation.offsetBy(0,-1));
        var chaser7 = new Chaser(this);
        mainLayer.placeActor(chaser7, exitLocation.offsetBy(1,-1));
        var chaser8 = new Chaser(this);
        mainLayer.placeActor(chaser8, exitLocation.offsetBy(-1,1));

        var demoChest = new Chest(this, [new Potion()]);
        mainLayer.placeActor(demoChest, this.world.rooms.second().getCenter());

        // DEBUGGING AND DEV only, remove later
        this.exitLocation = exitLocation;
    }

}
