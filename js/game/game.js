Game = function(renderer){
    this.renderer = renderer;
    this.frameClock = null;
    this.framesPerSecond = 1; //20 might be reasonable
    this.world = new World(50,25);

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
