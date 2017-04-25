Player = function(game){
  this.character = 'O';
  this.location = null;
  this.world = null;
  this.game = game;

  this.move = function(direction){
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.world != null){
      // Assume we're on the main layer
      var mainLayer = this.world.layers.filter(function(layer){
          return layer.type == Enums.LayerType.Main;
        }).first();

      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      var result = Movement.TryMove(this,mainLayer,moveTo);

      if(result){
        // Moved
      }
      else{
        // Collided
        var collidedWith = mainLayer.getTile(moveTo.x,moveTo.y);
        if(collidedWith instanceof StairsDown){
          this.game.startRandomDungeon();
        }
      }
    }
  };
};
