class GenerationHelpers {
    // One-off Helpers Functions
    static canPlace(room: Room, rooms: Room[], totalWidth: number, totalHeight: number) {
        // Check if it goes out of bounds
        // the 1 and -1s are to ensure that they dont also touch the exact edge, but stay 1 away
        if (room.left() < 1 || room.right() > totalWidth - 1 || room.top() < 1 || room.bottom() > totalHeight - 1) {
            return false;
        }

        // Check for intersections with any other room
        for (var i = 0; i < rooms.length; i++) {
            var otherRoom = rooms[i];
            if (Room.Intersects(room, otherRoom)) {
                return false;
            }
        }
        return true;
    }

    // Carve the Room out of Actor on a Layer
    static carveRoom(room: Room, wallLayer: Layer, floorLayer: Layer, floorActorType: any, gameReference: Game) {
        for (var y = room.top(); y < room.bottom(); y++) {
            for (var x = room.left(); x < room.right(); x++) {
                // Carve out the walls
                wallLayer.placeActor(null, new Point(x, y));

                // Place a floor
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));
            }
        }
    }

    // Given 2 Rooms, create a hallway made of Actor at given thicknesses on a Layer
    static carveHallway(room1: Room, room2: Room, wallLayer: Layer, floorLayer: Layer, floorActorType: any, minHallThickness: number, maxHallThickness: number, random: Random, gameReference: Game, doorsToPlace: Door[]) {
        var prevCenter = room1.getCenter();
        var newCenter = room2.getCenter();

        // We want to get a random number between
        var hallThickness = Numbers.roundToOdd(
            random.next(minHallThickness, maxHallThickness)
        );

        // Draw a corridor between me and the last room
        var horizontalFirst = random.next(0, 2);

        if (horizontalFirst) {
            this.carveHorizontalHallway(prevCenter.x, newCenter.x, prevCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference, doorsToPlace, room1, room2, true);
            this.carveVerticalHallway(prevCenter.y, newCenter.y, newCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference, doorsToPlace, room1, room2, false);
        }
        else {
            //vertical first
            this.carveVerticalHallway(prevCenter.y, newCenter.y, prevCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference, doorsToPlace, room1, room2, true);
            this.carveHorizontalHallway(prevCenter.x, newCenter.x, newCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference, doorsToPlace, room1, room2, false);
        }
    }

    private static newDoorHere(gameReference: Game, x: number, y: number, orientation: Orientation, doorsToPlace: Door[]): void {
        // roll a die to decide whether to even put one down or not
        if (gameReference.random.wasLuckyPercent(50)) {
            var newDoor = new Door(gameReference, orientation);
            newDoor.location = new Point(x, y);
            doorsToPlace.push(newDoor);
        }
    }

    // Carve a horizontal hallway at a given Y, from a given X to X2, on a Layer, and fill with an Actor
    static carveHorizontalHallway(x1: number, x2: number, y: number, thickness: number, wallLayer: Layer, floorLayer: Layer, floorActorType: any, gameReference: Game, doorsToPlace: Door[], room1: Room, room2: Room, startingWithThis: boolean) {
        // bulk to add on either side of hallway if thickness > 1
        var bulk = thickness == 1 ? 0 : (thickness - 1) / 2;

        // figure out room order (for door dropping)
        var room1_orig: Room = room1;
        var room2_orig: Room = room2;
        room1 = null;
        room2 = null;
        if (room1_orig.getCenter().x > room2_orig.getCenter().x) {
            room1 = room2_orig;
            room2 = room1_orig;
        }
        else {
            room1 = room1_orig;
            room2 = room2_orig;
        }

        for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1 + bulk; x++) {
            if (thickness == 1) {
                // Carve to null from the walls
                wallLayer.placeActor(null, new Point(x, y));

                // Add the floor tile
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));

                // And mark this space as needing a door if it's at the boundry of a room
                if (
                    (!startingWithThis && x === room1.right() + 1) ||
                    (startingWithThis && x === room2.left() - 1)
                ) {
                    this.newDoorHere(gameReference, x, y, Orientation.Horizontal, doorsToPlace);
                }
            }
            else {
                for (var o = bulk; o > -bulk; o--) {
                    // Carve to null from the walls
                    wallLayer.placeActor(null, new Point(x, y + o));

                    // Add the floor tile
                    var actor = new floorActorType(gameReference);
                    floorLayer.placeActor(actor, new Point(x, y + o));
                }
            }
        }
    }

    // Carve a horizontal hallway at a given X, from a given Y to Y2, on a Layer, and fill with an Actor
    static carveVerticalHallway(y1: number, y2: number, x: number, thickness: number, wallLayer: Layer, floorLayer: Layer, floorActorType: any, gameReference: Game, doorsToPlace: Door[], room1: Room, room2: Room, startingWithThis: boolean) {
        // bulk to add on either side of hallway if thickness > 1
        var bulk = thickness == 1 ? 0 : (thickness - 1) / 2;

        // figure out room order (for door dropping)
        var room1_orig: Room = room1;
        var room2_orig: Room = room2;
        room1 = null;
        room2 = null;
        if (room1_orig.getCenter().y > room2_orig.getCenter().y) {
            room1 = room2_orig;
            room2 = room1_orig;
        }
        else {
            room1 = room1_orig;
            room2 = room2_orig;
        }

        for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
            if (thickness == 1) {
                // Carve to null from the walls
                wallLayer.placeActor(null, new Point(x, y));

                // Add the floor tile
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));

                // And mark this space as needing a door if it's at the boundry of a room
                if (
                    (startingWithThis && y === room1.bottom() + 1) ||
                    (!startingWithThis && y === room2.top() - 1)
                ) {
                    this.newDoorHere(gameReference, x, y, Orientation.Vertical, doorsToPlace);
                }
            }
            else {
                for (var o = bulk; o > -bulk; o--) {
                    // Carve to null from the walls
                    wallLayer.placeActor(null, new Point(x + o, y));

                    // Add the floor tile
                    var actor = new floorActorType(gameReference);
                    floorLayer.placeActor(actor, new Point(x + o, y));
                }
            }
        }
    }

    // Given a world and a list of doors with their locations and orientations set but not placed, place them
    //   on the WallDecor layer
    static placeDoors(world: World, doorsToPlace: Door[]) {
        for (let d = 0; d < doorsToPlace.length; d++) {
            var door = doorsToPlace[d];
            var layer: Layer = world.getLayersOfType(LayerType.Wall).first();
            layer.placeActor(door, door.location);
        }
    }
}
