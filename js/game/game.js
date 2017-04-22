Game = function(renderer){
    this.renderer = renderer;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable
    var seed = (new Date).getTime();
    console.log('GENERATED WITH SEED ' + seed);

    this.world = DungeonGenerator.Generate(
        seed,//seed,
        60,//totalWidth,
        60,//totalHeight,
        2,//minRoomWidth,
        20,//maxRoomWidth,
        2,//minRoomHeight,
        20,//maxRoomHeight,
        10,//minNumRooms,
        30,//maxNumRooms,
        500//retryAttempts
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
