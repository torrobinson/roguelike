Layer = function(width, height, zIndex, name, type){
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.name = name;
    this.type = type;
    this.tiles = [];

    this.setTile = function(x,y,actor){
        this.tiles[y][x] = actor;
    };

    this.getTile=function(x,y){
        return this.tiles[y][x];
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

    this.placeActor = function(actor, location){
        this.setTile(location.x, location.y, actor);
        actor.location = new Point(location.x, location.y);
        actor.layer = this;
    };

    this.clear = function(){
      this.fillWith(null);
    };

    // Clear it initially (initialize with all nulls)
    this.clear();
};
