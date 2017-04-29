class Game{
  constructor(renderer,seed){
    this.renderer = renderer;
    this.renderer.game = this; // set up a reference

    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 30; //20 might be reasonable
    this.tickClock = null;
    this.ticksPerSecond = 30;

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

    this.startTickTimer = function (game){
        game.tickClock= setInterval(function() {
          game.gameTick(game);
        },
        (1/game.ticksPerSecond)*1000);
    };
  }

    start(){
      this.startFrameTimer(this);
      this.startTickTimer(this);
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
       if(this.world!==null){
         var actor = null;
         for(var l=0;l<this.world.layers.length;l++){
           for(var y=0;y<this.world.layers[l].tiles.length;y++){
             for(var x=0;x<this.world.layers[l].tiles[y].length;x++){
               actor = this.world.layers[l].getTile(x,y);
               if(actor instanceof Actor){
                 actor.tick();
               }
             }
           }
         }
       }
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
    }

    setRandomDungeon(){

        this.seed++;

        // Generate the dungeon
        var settings = new GenerateCarvedWorldSettings();
        settings.totalWidth = 100;
        settings.totalHeight = 100;
        settings.minRoomWidth = 7;
        settings.maxRoomWidth = 20;
        settings.minRoomHeight = 7;
        settings.maxRoomHeight = 20;
        settings.minNumRooms = 60;
        settings.maxNumRooms = 120;
        settings.minHallThickness = 1;
        settings.maxHallThickness = 3;
        settings.retryAttempts = 1000;
        settings.floorActor = new Floor(this);

        this.world = WorldGenerator.GenerateCarvedWorld(
            this.seed,  // seed,
            settings,   // settings,
            this        // forward on the reference to this game instance
        );
        // Pass a reference to the world so the player can navigate it
        this.player.world = this.world;

        var mainLayer = this.world.layers.filter(function(layer){
          return layer.type == LayerType.Main;
        }).first();
        var starterRoomCenter = this.world.rooms.first().getCenter();
        var lastRoomCenter = this.world.rooms.last().getCenter();

        var spawnLocation = new Point(starterRoomCenter.x, starterRoomCenter.y);
        var exitLocation = new Point(lastRoomCenter.x, lastRoomCenter.y);

        mainLayer.placeActor(this.player, spawnLocation);

        var exit = new StairsDown(this);
        mainLayer.placeActor(exit, exitLocation);
    }

}
