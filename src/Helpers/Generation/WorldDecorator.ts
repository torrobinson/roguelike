class WorldDecoratorSettings {
    minNumberOfChests: number = 0;
    maxNumberOfChests: number = 2;
    minNumberOfChestContents: number = 1;
    maxNumberOfChestContents: number = 3;
}

class WorldDecorator {
    settings: WorldDecoratorSettings;
    random: Random;
    constructor(settings: WorldDecoratorSettings, seed: number) {
        this.settings = settings;
        this.random = new Random(seed);
    }

    decorate(world: World) {
        // Connect walls
        this.setAjdacentActorStatuses(world, LayerType.Wall, Wall);

        // Decorate with objects
        this.decorateAllRooms(world);

        // Drop gold
        this.dropGold(world);

        // Connect carpets
        this.setAjdacentActorStatuses(world, LayerType.FloorDecor, Carpet);
    }

    setAjdacentActorStatuses(world: World, layerType: any, actorType: any) {
        var layer = world.getLayersOfType(layerType).first();
        if (layer !== undefined && layer !== null) {
            for (var y = 0; y < layer.tiles.length; y++) {
                for (var x = 0; x < layer.tiles[y].length; x++) {
                    var tile = layer.getTile(x, y);
                    if (tile instanceof actorType) {
                        tile.facing = WorldDecoratorHelpers.getTileAdjacencyBitmask(layer, tile.location, actorType);
                    }
                }
            }
        }
    }

    decorateAllRooms(world: World) {
        // Shuffle the rooms
        var rooms = world.rooms.shuffle(this.random);

        // For each room
        for (var r = 0; r < rooms.length; r++) {
            // Decorate it
            this.decorateRoom(world, rooms[r]);
        }
    }

    decorateRoom(world: World, room: Room) {
        // Pick a random room type
        var roomType = Enumeration.GetRandomEnumValue(RoomDecorationType, this.random);
        var wallLayer = world.getLayersOfType(LayerType.Wall).first();
        var floorDecorLayer = world.getLayersOfType(LayerType.FloorDecor).first();

        // NOTHING
        if (roomType === RoomDecorationType.Nothing) {
            // Empty rooms get a 1/3 chance of having torches in the corners
            if (this.random.wasLucky(1, 3)) {
                WorldDecoratorHelpers.addTorchesToCorners(
                    world.game,
                    wallLayer,
                    room,
                    [ColorCode.Green, ColorCode.Red, ColorCode.Pink, ColorCode.Yellow, LightColorCode.White].pickRandom(this.random)
                );
            }
        }

        // ATRIUM
        else if (roomType === RoomDecorationType.Atrium) {
            var orientation = Enumeration.GetRandomEnumValue(Orientation, this.random);
            // Build columns down the sides, padded by 1
            WorldDecoratorHelpers.decorateDownWalls(
                world.game,
                wallLayer,
                room,
                1,    // ensures what is placed always has 1 space free around it
                Pillar,
                orientation
            );

            // Half of all atriums get torches
            if (this.random.go() > 0.5) {
                WorldDecoratorHelpers.addTorchesToCorners(
                    world.game,
                    wallLayer,
                    room,
                    LightColorCode.White
                );
            }
        }

        // LIBRARY
        else if (roomType === RoomDecorationType.Library) {

            // Put a carpet down the middle
            var carpetPadding = this.random.next(1, (Math.min(room.height, room.width) / 2) - 1);
            WorldDecoratorHelpers.decorateWithCenteredRectangle(
                world.game,
                floorDecorLayer,
                room,
                carpetPadding,
                Carpet
            );

            // Build bookshelves down the sides, against the walls (padded by 0)
            var orientation = Enumeration.GetRandomEnumValue(Orientation, this.random);
            WorldDecoratorHelpers.decorateDownWalls(
                world.game,
                wallLayer,
                room,
                0,
                Bookshelf,
                orientation
            );
        }

        // GRAVEYARD
        else if (roomType === RoomDecorationType.Graveyard) {
            var min: number = 1, max: number;

            switch (room.getSizeCategory()) {
                case SizeCategory.Tiny:
                    max = 2;
                    break;

                case SizeCategory.Small:
                    max = 4;
                    break;

                case SizeCategory.Medium:
                    max = 8;
                    break;

                case SizeCategory.Large:
                    max = 16;
                    break;

                case SizeCategory.Huge:
                    max = 32;
                    break;
            }

            WorldDecoratorHelpers.populateWithActor(
                world.game,
                wallLayer,
                room,
                [Tombstone, CrossGrave],
                this.random,
                min,
                max,
                false
            );
        }

    }

    dropGold(world: World) {
        var wallLayer = world.getLayersOfType(LayerType.Wall).first();
        for (var r = 0; r < world.rooms.length; r++) {
            var room = world.rooms[r];
            // Rooms get a 1/7 chance of having gold in them anywhere
            if (this.random.wasLucky(1, 8)) {
                WorldDecoratorHelpers.populateWithActor(
                    world.game,
                    wallLayer,
                    room,
                    [GoldPile],
                    this.random,
                    1, //between 1 and 4 of them will be dropped
                    3
                );
            }
        }
    }

}
