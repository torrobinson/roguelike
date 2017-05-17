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
            // Do nothing
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

            WorldDecoratorHelpers.addTorchesToCorners(
              world.game,
              wallLayer,
              room,
              LightColors.White
            );
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

    }

}
