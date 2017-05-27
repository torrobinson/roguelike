class Layer {
    width: number;
    height: number;
    zIndex: number;
    name: string;
    type: LayerType;
    tiles: any[];

    constructor(width: number, height: number, zIndex: number, name: string, type: LayerType) {
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
        this.name = name;
        this.type = type;
        this.tiles = [];

        // Clear it initially (initialize with all nulls)
        this.clear();
    }

    // Don't use this externally, as any time we place an actor down, we want to
    //  make the actor aware of it's layer and location. Use placeActor instead.
    setTile(x: number, y: number, actor: Actor) {
        this.tiles[y][x] = actor;
    }

    destroyTile(x: number, y: number) {
        this.setTile(x, y, null);
    }

    getTile(x: number, y: number): Actor {
        var vert = this.tiles[y];
        if (vert) {
            return vert[x];
        }
        else {
            return null;
        }
    }

    // Will fill with unaware actors (no layer or world or game contexts)
    fillWith(actorType: any, gameReference: Game) {
        this.tiles = [];
        for (var y = 0; y < this.height; y++) {
            var newRow = [];
            for (var x = 0; x < this.width; x++) {
                if (actorType !== null) {
                    var actor = new actorType(gameReference);
                    actor.location = new Point(x, y);
                    actor.layer = this;
                    newRow.push(actor);
                }
                else {
                    newRow.push(null);
                }
            }
            this.tiles.push(newRow);
        }
    }

    placeActor(actor: Actor, location: Point) {
        this.setTile(location.x, location.y, actor);
        if (actor !== null) {
            actor.location = location;
            actor.layer = this;
        }
    }

    clear() {
        this.fillWith(null, null);
    }

    // Generate a collision grid of 0s and 1s for pathfinding through
    getCollisionGrid(ignorePointA: Point, ignorePointB: Point) {
        var grid = [];
        for (var y = 0; y < this.tiles.length; y++) {
            var row = [];
            for (var x = 0; x < this.tiles[y].length; x++) {
                var actor = this.getTile(x, y);
                if (actor === null || (x == ignorePointA.x && y == ignorePointA.y) || (x == ignorePointB.x && y == ignorePointB.y)) {
                    row.push(PathfinderTile.Walkable);
                }
                else {
                    row.push(PathfinderTile.Unwalkable);
                }
            }
            grid.push(row);
        }
        return grid;
    }
}
