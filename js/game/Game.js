class Game{
  constructor(renderer,seed){
    this.renderer = renderer;
    this.renderer.game = this; // set up a reference

    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 30; //20 might be reasonable

    // Add a Player to the first room with a reference back to this game
    this.player = new Player(this);

    this.world = null;

    // Initialize the renderer
    this.renderer.init();


    // Helpers
    this.startTimer = function (game){
        game.frameClock= setInterval(function() {
          game.frameTick(game);
        },
        (1/game.framesPerSecond)*1000);
    };
  }

    start(){
      this.startTimer(this);
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

    controlPressed(control){
        // Arrows
        if([Enums.Controls.UpArrow,Enums.Controls.DownArrow,Enums.Controls.LeftArrow,Enums.Controls.RightArrow].contains(control)){
            // Check if paused, check if blah, blah blah, for now, just move the player.
            var directionToMove = Movement.ControlArrowToDirection(control);
            this.player.move(directionToMove);
        }
    }

    setRandomDungeon(){

        this.seed++;

        // Generate the dungeon
        var settings = new GenerateCarvedWorldSettings();
        settings.totalWidth = 100;
        settings.totalHeight = 100;
        settings.minRoomWidth = 3;
        settings.maxRoomWidth = 20;
        settings.minRoomHeight = 3;
        settings.maxRoomHeight = 20;
        settings.minNumRooms = 60;
        settings.maxNumRooms = 120;
        settings.minHallThickness = 1;
        settings.maxHallThickness = 3;
        settings.retryAttempts = 3000;
        settings.floorActor = new Floor(this);

        this.world = WorldGenerator.GenerateCarvedWorld(
            this.seed,  // seed,
            settings,   // settings,
            this        // forward on the reference to this game instance
        );
        // Pass a reference to the world so the player can navigate it
        this.player.world = this.world;

        var mainLayer = this.world.layers.filter(function(layer){
          return layer.type == Enums.LayerType.Main;
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
