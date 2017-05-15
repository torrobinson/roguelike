class WorldDecoratorHelpers {
    // Given a layer and the tile's location, return the bitmask representing the adjacent tiles
    // Numbers will align to the ActorStatus enumeration for wall status directions
    static getTileAdjacencyBitmask(layer: Layer, tileLocation: Point, adjacentType: any) {
        var up = tileLocation.y > 0 && layer.getTile(tileLocation.x, tileLocation.y - 1) instanceof adjacentType ? 1 : 0;
        var down = tileLocation.y < layer.tiles.length - 1 && layer.getTile(tileLocation.x, tileLocation.y + 1) instanceof adjacentType ? 4 : 0;
        var left = tileLocation.x > 0 && layer.getTile(tileLocation.x - 1, tileLocation.y) instanceof adjacentType ? 8 : 0;
        var right = tileLocation.x < layer.tiles[tileLocation.y].length - 1 && layer.getTile(tileLocation.x + 1, tileLocation.y) instanceof adjacentType ? 2 : 0;
        return up + down + left + right;
    }

    static decorateDownWalls(game: Game, layer: Layer, room: Room, padding: number, actorType: any, orientation: Orientation) {

        // VERTICAL
        if (orientation === Orientation.Vertical) {
            var leftX = padding;
            var rightX = room.width - (padding + 1);
            for (var y = (padding > 0 ? padding : 1); y + (padding > 0 ? padding : 1) < room.height; y += (padding + 1)) {
                var leftLocation = room.position.offsetBy(leftX, y);
                if (layer.getTile(leftLocation.x, leftLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(leftLocation.x - 1, leftLocation.y) instanceof Wall)) {
                        layer.placeActor(new actorType(game), leftLocation);
                    }
                }
                var rightLocation = room.position.offsetBy(rightX, y);
                if (layer.getTile(rightLocation.x, rightLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(rightLocation.x + 1, rightLocation.y) instanceof Wall)) {
                        layer.placeActor(new actorType(game), rightLocation);
                    }
                }
            }
        }


        // HORIZONTAL
        else if (orientation === Orientation.Horizontal) {
            var topY = padding;
            var bottomY = room.height - (padding + 1);
            for (var x = (padding > 0 ? padding : 1); x + (padding > 0 ? padding : 1) < room.width; x += (padding + 1)) {
                var topLocation = room.position.offsetBy(x, topY);
                if (layer.getTile(topLocation.x, topLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(topLocation.x, topLocation.y - 1) instanceof Wall)) {
                        layer.placeActor(new actorType(game), topLocation);
                    }
                }
                var bottomLocation = room.position.offsetBy(x, bottomY);
                if (layer.getTile(bottomLocation.x, bottomLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(bottomLocation.x, bottomLocation.y + 1) instanceof Wall)) {
                        layer.placeActor(new actorType(game), bottomLocation);
                    }
                }
            }
        }

    }


    // Given a layer, a room, and the padding to ignore around the room's border, draw a rectangle of
    //  actorytpe in the center of the room
    static decorateWithCenteredRectangle(game: Game, layer, room, padding, actorType) {
        for (var y = padding; y < room.height - padding; y++) {
            for (var x = padding; x < room.width - padding; x++) {
                var location = Movement.AddPoints(room.position, new Point(x, y));
                if (layer.getTile(location.x, location.y) === null) {
                    layer.placeActor(new actorType(game), location);
                }
            }
        }
    }
}
