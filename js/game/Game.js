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

    // this.startTickTimer = function (game){
    //     game.tickClock= setInterval(function() {
    //       game.gameTick(game);
    //     },
    //     (1/game.ticksPerSecond)*1000);
    // };
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
          this.player.addCommand(
            new MoveTo(
              this.player,
              this.exitLocation
            )
          );
        }

        this.gameTick(this);
    }

    setRandomDungeon(){

        this.player.clearCommands();

        this.seed++;

        // Generate the dungeon
        var settings = new GenerateCarvedWorldSettings();
        settings.totalWidth = 30;
        settings.totalHeight = 30;
        settings.minRoomWidth = 3;
        settings.maxRoomWidth = 10;
        settings.minRoomHeight = 3;
        settings.maxRoomHeight = 10;
        settings.minNumRooms = 5;
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

        var chaser = new Chaser(this);
        mainLayer.placeActor(chaser, exitLocation.offsetBy(1,1));

        // DEBUGGING AND DEV only
        this.exitLocation = exitLocation;
    }

}
