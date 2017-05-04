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
        var collisionGrid = this.actor.layer.getCollisionGrid(
          this.actor.location, // consider the start and destination to be points that are walkable for the pathfinder to run
          point // consider the start and destination to be points that are walkable for the pathfinder to run
        );

        //collisionGrid = transpose(collisionGrid);

        // Perform a Pathfind if we're more than 1 away
        var grid = new PF.Grid(collisionGrid.length,collisionGrid[0].length,collisionGrid);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(this.actor.location.x, this.actor.location.y, point.x, point.y, grid);
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
