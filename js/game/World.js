World = function(width, height){
    this.width = width;
    this.height = height;

    // The layers of the world.
    this.layers = [];

    // The defined rooms of the world
    this.rooms = [];

    this.addLayer = function(layer){
        this.layers.push(layer);
    };
};
