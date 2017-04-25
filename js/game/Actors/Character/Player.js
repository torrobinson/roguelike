Player = function(game){
  this.character = 'O';
  this.location = null;
  this.game = game;
  this.layer = null;

  this.move = function(direction){
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.layer != null){
      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      var result = Movement.TryMove(this,this.layer,moveTo);
      if(result){
        // Moved
      }
      else{
        // Collided
        var collidedWith = this.layer.getTile(moveTo.x,moveTo.y);
        if(collidedWith instanceof StairsDown){
          this.game.startRandomDungeon();
        }
      }
    }
  };
};
