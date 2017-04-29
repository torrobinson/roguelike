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
        // Perform a Pathfind if we're more than 1 away
        var pathfinder = new AStar();
        pathfinder.setGrid(
          this.actor.layer.getCollisionGrid(
            this.actor.location, // consider the start and destination to be points that are walkable for the pathfinder to run
            point // consider the start and destination to be points that are walkable for the pathfinder to run
          )
        );
        pathfinder.setAcceptableTiles(
          [PathfinderTile.Walkable]
        );
        var command = this;
        pathfinder.findPath(
          this.actor.location,
          point,
           function(path){
          	if (path !== null){
              for(var p=1; p<path.length; p++){
                var lastStep = path[p-1];
                var step = path[p];
                command.addAction(
                    new Move(
                      command,
                      Movement.AdjacentPointsToDirection(
                        lastStep,
                        step
                        )
                    )
                );
              }
          		return true;
          	}
            else{
              // No path found
          		return false;
            }
        });
        pathfinder.calculate();
    }
  }
}
