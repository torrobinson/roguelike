class Actor{
  constructor(game){
    // Actors must be born with awareness of the game they are in
    this.game = game;

    this.character = ' ';
    this.location = null;
    this.layer = null;
  }

  move(direction){
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.layer != null){
      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      var result = Movement.TryMove(this,this.layer,moveTo);
      if(result){
        // Moved

      }
      else{
        // Collided
        var actorHit = this.layer.getTile(moveTo.x,moveTo.y);
        this.collidedWith(actorHit);
        actorHit.collidedWith(this);
      }
    }
  }

  collidedWith(actor){
  }

}
