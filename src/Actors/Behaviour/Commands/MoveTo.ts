import { Action } from 'src/Actors/Behaviour/Action'
import { Actor } from 'src/Actors/Actor'
import { Point } from 'src/Point'
import { Move } from 'src/Actors/Behaviour/Actions/Move'
import { Command } from 'src/Actors/Behaviour/Command'
import { Enums } from 'src/Helpers/Enums'
import { Movement } from 'src/Helpers/Movement'

declare var PF: any;

export class MoveTo extends Command {
    constructor(actor: Actor, endPoint: Point, overrideStartPoint?: Point) {
        super(actor);

        var startPoint = actor.location;

        // overrideStartPoint is an optional override to where to calculate the move's starting location
        if (overrideStartPoint) {
            startPoint = overrideStartPoint;
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
        this.actor.status = Enums.ActorStatus.Moving;
    }
}
