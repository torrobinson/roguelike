Game = function(renderer){
    this.renderer = renderer;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable

    this.world = DungeonGenerator.Generate(
        23311,//seed,
        75,//totalWidth,
        50,//totalHeight,
        5,//minRoomWidth,
        10,//maxRoomWidth,
        5,//minRoomHeight,
        10,//maxRoomHeight,
        1,//minNumRooms,
        3//maxNumRooms
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
