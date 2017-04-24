Game = function(renderer){
    this.renderer = renderer;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable
    var seed = (new Date).getTime(); // OR A HARDCODED SEED

    this.world = DungeonGenerator.Generate(
        seed,//seed,
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

    this.renderer.init();

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
