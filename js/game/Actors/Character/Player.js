Player = function(){
  this.character = '@';
  this.location = null;

  this.move = function(direction){
    var offsetToMove = Movement.DirectionToOffset(direction);
    // offsetToMove.x, offsetToMove.y
  };
};
