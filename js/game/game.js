Game = function(renderer,seed){
    // Set up the game
    this.renderer = renderer;
    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 20; //20 might be reasonable

    // Generate the dungeon
    settings = new GenerateCarvedWorldSettings();
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
    settings.floorActor = new Floor();
    this.world = WorldGenerator.GenerateCarvedWorld(
        this.seed, // seed,
        settings   // settings
    );

    // Add a Player to the first room
    var player = new Player();
    // Pass a reference to the world so the player can navigate it
    player.world = this.world;
    var mainLayer = this.world.layers.filter(function(layer){
      return layer.type == Enums.LayerType.Main;
    }).first();
    var starterRoomCenter = this.world.rooms.first().getCenter();
    mainLayer.setTile(starterRoomCenter.x, starterRoomCenter.y, player);
    player.location = new Point(starterRoomCenter.x, starterRoomCenter.y);

    // TODO: call WorldGenerator functions to add decoration layers and add all actors needed

    // Initialize the renderer
    this.renderer.init();

    // Functions
    this.start = function(){
        this.renderer.drawFrame(this.world);
        this.frameClock= setInterval(this.frameTick, (1/this.framesPerSecond)*1000);
    };
    this.pause = function(){
        clearInterval(this.frameClock);
    };
    this.frameTick = function(){
        this.renderer.drawFrame(this.world);
    }.bind(this);

    this.controlPressed = function(control){
        // Arrows
        if([Enums.Controls.UpArrow,Enums.Controls.DownArrow,Enums.Controls.LeftArrow,Enums.Controls.RightArrow].contains(control)){
            // Check if paused, check if blah, blah blah, for now, just move the player.
            var directionToMove = Movement.ControlArrowToDirection(control);
            player.move(directionToMove);
        }
    };
};
