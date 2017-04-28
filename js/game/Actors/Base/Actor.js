class Actor{
  constructor(game){
    // Actors must be born with awareness of the game they are in
    this.game = game;

    this.facing = Directions.Down;

    this.character = ' ';
    this.location = null;
    this.layer = null;
  }

  move(direction){
    this.facing = direction;
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.layer !== null){
      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      var result = Movement.TryMove(this,this.layer,moveTo);
      if(result){
        // Moved

      }
      else{
        // Collided
        var actorHit = this.layer.getTile(moveTo.x,moveTo.y);
        this.collidedInto(actorHit);
        actorHit.collidedBy(this);
      }
    }
  }

  // Generic action to perform when any collision happened
  collided(){

  }

  // When tried to move into another object
  collidedInto(actor){
    this.collided();

  }

  // When another object tried to move into me
  collidedBy(actor){
    this.collided();

  }

  tick(){
  }

  destroy(){
    // any teardowns to perform when being destroyed
  }
}
