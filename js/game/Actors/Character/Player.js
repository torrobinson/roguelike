Player = function(){
  this.character = 'O';
  this.location = null;
  this.world = null;

  this.move = function(direction){
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.world != null){
      // Assume we're on the main layer
      var mainLayer = this.world.layers.filter(function(layer){
          return layer.type == Enums.LayerType.Main;
        }).first();

      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      // So we know we're at this.location in mainLayer.tiles

      if(Movement.CanMove(this,mainLayer,moveTo)){
        // Where we just were couldn't have been occupied, so clear it
        mainLayer.setTile(this.location.x, this.location.y, null);

        // Now move up by the offset
        this.location = moveTo;
        mainLayer.setTile(this.location.x, this.location.y, this);
      }
    }
  };
};
