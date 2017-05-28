declare var PF: any;

class MoveTo extends Command {
    /**
     * constructor
     * @param  {Actor}      actor    [description]
     * @param  {Point}      endPoint [description]
     * @param  {boolean =        false}       canBeNear if true, actor will try move as close as possible
     * @param  {number =        5}       canBeNearRadius is the radius around endPoint to check for free spots to override with, if endPoint is taken
     */
    constructor(actor: Actor, endPoint: Point, canBeNear: boolean = false, canBeNearRadius: number = 5) {
        super(actor);

        var startPoint = actor.location;
        // Override the endPoint to be as close as possible, if endPoint is current blocked
        if (canBeNear && actor.layer.getTile(endPoint.x, endPoint.y) !== null) {
            var nearestPoint = Geometry.GetNearestFreePointTo(endPoint, actor.layer, canBeNearRadius)
            if (nearestPoint != null) {
                endPoint = nearestPoint;
            }
        }

        if (Point.getDistanceBetweenPoints(startPoint, endPoint) === 1) {
            // If we're only 1 away, just add a single simple move actions
            this.addAction(
                new Move(this, Movement.AdjacentPointsToDirection(startPoint, endPoint))
            );
        }
        else {
            var collisionGrid = this.actor.layer.getCollisionGrid(
                startPoint, // consider the start and destination to be points that are walkable for the pathfinder to run
                endPoint // consider the start and destination to be points that are walkable for the pathfinder to run
            );

            // Perform a Pathfind if we're more than 1 away

            var grid = new PF.Grid(collisionGrid.length, collisionGrid[0].length, collisionGrid);
            var finder = new PF.AStarFinder();
            var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, grid);
            if (path.length > 0) {
                for (var p = 1; p < path.length; p++) {
                    var lastStep = new Point(path[p - 1][0], path[p - 1][1]);
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

    execute() {
        super.execute();

        // Set status based on actions happening now
        this.actor.status = ActorStatus.Moving;
    }
}
