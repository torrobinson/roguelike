World = function(width, height){
    this.width = width;
    this.height = height;

    // By default set the world to be all earth/stone/solid before carving it out
    this.tiles = [];
    for(var y=0;y<height;y++){
        var newRow = [];
        for(var x=0;x<width;x++){
            newRow.push(
                new Earth()
            );
        }
        this.tiles.push(newRow);
    }
    
};
