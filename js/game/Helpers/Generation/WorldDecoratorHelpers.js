class WorldDecoratorHelpers{
      // Given a layer and the tile's location, return the bitmask representing the adjacent tiles
      // Numbers will align to the ActorStatus enumeration for wall status directions
      static getTileAdjacencyBitmask(layer, tileLocation, adjacentType){
         var up = tileLocation.y > 0 && layer.getTile(tileLocation.x,tileLocation.y-1) instanceof adjacentType ? 1 : 0;
         var down = tileLocation.y < layer.tiles.length -1 && layer.getTile(tileLocation.x,tileLocation.y+1) instanceof adjacentType ? 4: 0;
         var left = tileLocation.x > 0 && layer.getTile(tileLocation.x-1,tileLocation.y) instanceof adjacentType ? 8 : 0;
         var right = tileLocation.x < layer.tiles[tileLocation.y].length - 1 && layer.getTile(tileLocation.x+1,tileLocation.y) instanceof adjacentType ? 2 : 0;
         return up + down + left + right;
      }
}
