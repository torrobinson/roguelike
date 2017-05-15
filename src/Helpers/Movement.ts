class Movement {
    static ControlArrowToDirection(control) {
        if (control == Control.UpArrow) {
            return Direction.Up;
        }
        if (control == Control.DownArrow) {
            return Direction.Down;
        }
        if (control == Control.LeftArrow) {
            return Direction.Left;
        }
        if (control == Control.RightArrow) {
            return Direction.Right;
        }
    }

    static DirectionToOffset(direction) {
        if (direction == Direction.Up) {
            return new Point(0, -1);
        }
        if (direction == Direction.Down) {
            return new Point(0, 1);
        }
        if (direction == Direction.Left) {
            return new Point(-1, 0);
        }
        if (direction == Direction.Right) {
            return new Point(1, 0);
        }
        if (direction == Direction.UpLeft) {
            return new Point(-1, -1);
        }
        if (direction == Direction.UpRight) {
            return new Point(1, -1);
        }
        if (direction == Direction.DownLeft) {
            return new Point(-1, 1);
        }
        if (direction == Direction.DownRight) {
            return new Point(1, 1);
        }
    }

    static AdjacentPointsToDirection(point1, point2) {
        var x = point2.x - point1.x;
        var y = point2.y - point1.y;
        if (x == 0 && y == 1) {
            return Direction.Down;
        }
        if (x == 0 && y == -1) {
            return Direction.Up;
        }
        if (x == 1 && y == 0) {
            return Direction.Right;
        }
        if (x == -1 && y == 0) {
            return Direction.Left;
        }
        if (x == 1 && y == 1) {
            return Direction.DownRight;
        }
        if (x == -1 && y == 1) {
            return Direction.DownLeft;
        }
        if (x == 1 && y == -1) {
            return Direction.UpRight;
        }
        if (x == -1 && y == -1) {
            return Direction.UpLeft;
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
