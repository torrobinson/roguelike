class MoveTo extends Command{
  constructor(actor, point){
    super(actor);
    if(Point.getDistanceBetweenPoints(actor.location,point) === 1){
        // If we're only 1 away, just add a single simple move actions
        this.addAction(
            new Move(this, Movement.AdjacentPointsToDirection(actor.location, point))
        );
    }
    else{
        //TODO build chain of actions
    }
  }
}
