Layer = function(width, height, zIndex){
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;

    this.tiles = [];

    this.setTile = function(x,y,actor){
        this.tiles[y][x] = actor;
    };

    this.fillWith = function(actor){
        this.tiles = [];
        for(var y=0;y<height;y++){
            var newRow = [];
            for(var x=0;x<width;x++){
                newRow.push(actor);
            }
            this.tiles.push(newRow);
        }
    };
};
