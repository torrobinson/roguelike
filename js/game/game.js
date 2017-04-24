Game = function(renderer,seed){
    // Set up the game
    this.renderer = renderer;
    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable

    // Generate the dungeon
    settings = new GenerateCarvedWorldSettings();
    settings.totalWidth = 100;
    settings.totalHeight = 100;
    settings.minRoomWidth = 3;
    settings.maxRoomWidth = 20;
    settings.minRoomHeight = 3;
    settings.maxRoomHeight = 20;
    settings.minNumRooms = 30;
    settings.maxNumRooms = 100;
    settings.minHallThickness = 1;
    settings.maxHallThickness = 3;
    settings.retryAttempts = 1000;
    settings.floorActor = new Floor();
    this.world = WorldGenerator.GenerateCarvedWorld(
        this.seed, // seed,
        settings   // settings
    );

    // TODO: call WorldGenerator functions to add decoration layers and add all actors needed

    // Initialize the renderer
    this.renderer.init();

    // Functions
    this.start = function(){
        this.renderer.drawFrame(this.world);
        this.frameClock= setInterval(this.frameTick, (1/this.framesPerSecond)*1000);
    };
    this.stop = function(){
        this.frameClock = null;
    };
    this.frameTick = function(){
        this.renderer.drawFrame(this.world);
    }.bind(this);
};
