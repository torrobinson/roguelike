class WorldDecorator{

    static setAjdacentWallStatuses(world){
        var layer = world.getLayersOfType(LayerType.Wall).first();
        if(layer!== undefined && layer!==null){
            for(var y=0; y<layer.tiles.length; y++){
                for(var x=0; x<layer.tiles[y].length; x++){
                    var tile = layer.getTile(x,y);
                    if(tile instanceof Wall){
                        tile.facing = WorldDecoratorHelpers.getTileAdjacencyBitmask(layer, tile.location, Wall);
                    }
                }
            }
        }
    }

}
