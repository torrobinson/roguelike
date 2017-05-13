import { Point } from 'src/Point'
import { Enums } from 'src/Helpers/Enums'
import { WorldItem } from 'src/Actors/WorldItems/Base/WorldItem'
import { Chest } from 'src/Actors/WorldItems/Chest'

export class Movement {
    static ControlArrowToDirection(control) {
        if (control == Enums.Control.UpArrow) {
            return Enums.Direction.Up;
        }
        if (control == Enums.Control.DownArrow) {
            return Enums.Direction.Down;
        }
        if (control == Enums.Control.LeftArrow) {
            return Enums.Direction.Left;
        }
        if (control == Enums.Control.RightArrow) {
            return Enums.Direction.Right;
        }
    }

    static DirectionToOffset(direction) {
        if (direction == Enums.Direction.Up) {
            return new Point(0, -1);
        }
        if (direction == Enums.Direction.Down) {
            return new Point(0, 1);
        }
        if (direction == Enums.Direction.Left) {
            return new Point(-1, 0);
        }
        if (direction == Enums.Direction.Right) {
            return new Point(1, 0);
        }
        if (direction == Enums.Direction.UpLeft) {
            return new Point(-1, -1);
        }
        if (direction == Enums.Direction.UpRight) {
            return new Point(1, -1);
        }
        if (direction == Enums.Direction.DownLeft) {
            return new Point(-1, 1);
        }
        if (direction == Enums.Direction.DownRight) {
            return new Point(1, 1);
        }
    }

    static AdjacentPointsToDirection(point1, point2) {
        var x = point2.x - point1.x;
        var y = point2.y - point1.y;
        if (x == 0 && y == 1) {
            return Enums.Direction.Down;
        }
        if (x == 0 && y == -1) {
            return Enums.Direction.Up;
        }
        if (x == 1 && y == 0) {
            return Enums.Direction.Right;
        }
        if (x == -1 && y == 0) {
            return Enums.Direction.Left;
        }
        if (x == 1 && y == 1) {
            return Enums.Direction.DownRight;
        }
        if (x == -1 && y == 1) {
            return Enums.Direction.DownLeft;
        }
        if (x == 1 && y == -1) {
            return Enums.Direction.UpRight;
        }
        if (x == -1 && y == -1) {
            return Enums.Direction.UpLeft;
        }
    };

    static AddPoints(point1, point2) {
        return new Point(point1.x + point2.x, point1.y + point2.y);
    }

    static doMove(actor, layer, desiredLocation) {
        // Remove it from the current location
        layer.destroyTile(actor.location.x, actor.location.y);

        // Drop it in the new location
        layer.placeActor(actor, new Point(desiredLocation.x, desiredLocation.y));

        return true;
    }

    static TryMove(actor, layer, desiredLocation) {

        var movingInto = layer.getTile(desiredLocation.x, desiredLocation.y);

        // If nothing is there, then move
        if (movingInto === null) {
            return this.doMove(actor, layer, desiredLocation);
        }
        // Else, collide
        else {

            // If we move into an Chest on the world, pick up the items inside (open it) and dont do the movement
            if (movingInto instanceof Chest) {
                movingInto.pickedUpBy(actor);
                return false;
            }

            // If we move into any generic Item on the world, pick up the item and allow the movement
            if (movingInto instanceof WorldItem) {
                movingInto.pickedUpBy(actor);
                return this.doMove(actor, layer, desiredLocation);
            }
            return false;
        }
    }
}
