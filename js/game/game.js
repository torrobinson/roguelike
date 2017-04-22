Game = function(renderer){
    this.renderer = renderer;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable
    var seed = (new Date).getTime(); // OR A HARDCODED SEED

    this.world = DungeonGenerator.Generate(
        seed,//seed,
        60,//totalWidth,
        60,//totalHeight,
        4,//minRoomWidth,
        15,//maxRoomWidth,
        4,//minRoomHeight,
        15,//maxRoomHeight,
        4,//minNumRooms,
        20,//maxNumRooms,
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
