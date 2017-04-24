Game = function(renderer,seed){
    // Set up the game
    this.renderer = renderer;
    this.seed= seed;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable

    // Generate the dungeon
    this.world = DungeonGenerator.Generate(
        this.seed,//seed,
        100,//totalWidth,
        100,//totalHeight,
        3,//minRoomWidth,
        20,//maxRoomWidth,
        3,//minRoomHeight,
        20,//maxRoomHeight,
        30,//minNumRooms,
        100,//,
        1,//minHallThickness
        3,//maxHallThickness
        1000//retryAttempts
    );

    // Initialize the renderer
    this.renderer.init();

    // Functions
    this.start = function(){
        this.frameClock= setInterval(this.frameTick, (1/this.framesPerSecond)*1000);
    };
    this.stop = function(){
        this.frameClock = null;
    };
    this.frameTick = function(){
        this.renderer.drawFrame(this.world);
    }.bind(this);
};
