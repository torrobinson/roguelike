class MoveTo extends Command{
  constructor(actor, endPoint, overrideStartPoint){
    super(actor);
    var startPoint = actor.location;

    // overrideStartPoint is an optional override to where to calculate the move's starting location
    if(overrideStartPoint !== undefined){
      startPoint = overrideStartPoint;
    }

    if(Point.getDistanceBetweenPoints(startPoint,endPoint) === 1){
        // If we're only 1 away, just add a single simple move actions
        this.addAction(
            new Move(this, Movement.AdjacentPointsToDirection(startPoint, endPoint))
        );
    }
    else{
        var collisionGrid = this.actor.layer.getCollisionGrid(
          startPoint, // consider the start and destination to be points that are walkable for the pathfinder to run
          endPoint // consider the start and destination to be points that are walkable for the pathfinder to run
        );

        //collisionGrid = transpose(collisionGrid);

        // Perform a Pathfind if we're more than 1 away
        var grid = new PF.Grid(collisionGrid.length,collisionGrid[0].length,collisionGrid);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, grid);
        if(path.length > 0)
        {
          for(var p=1; p<path.length; p++){
              var lastStep = new Point(path[p-1][0], path[p-1][1]);
              var step = new Point(path[p][0], path[p][1]);
              this.addAction(
                  new Move(
                    this,
                    Movement.AdjacentPointsToDirection(
                      lastStep,
                      step
                      )
                  )
              );
          }
        }
    }
  }
}
