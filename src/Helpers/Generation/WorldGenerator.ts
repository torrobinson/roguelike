class WorldGeneratorSettings {
    totalWidth: number = 0;
    totalHeight: number = 0;
    minRoomWidth: number = 0;
    maxRoomWidth: number = 0;
    minRoomHeight: number = 0;
    maxRoomHeight: number = 0;
    minNumRooms: number = 0;
    maxNumRooms: number = 0;
    minHallThickness: number = 1;
    maxHallThickness: number = 1;
    retryAttempts: number = 100;
    floorActorType: any = null;
}

class WorldGenerator {
    static GenerateCarvedWorld(
        seed: number,
        settings: WorldGeneratorSettings,
        game: Game
    ) {
        // The world to return
        var world = new World(settings.totalWidth, settings.totalHeight, game);


        var walLDecor = new Layer(settings.totalHeight, settings.totalWidth, 1, 'WallDecorations', LayerType.WallDecor);

        // Set up the main collision layer as ALL walls
        var wallLayer = new Layer(settings.totalHeight, settings.totalWidth, 0, 'Main', LayerType.Wall);
        wallLayer.fillWith(Wall, game);

        // Create a new empty floor layer.
        // As we carve away the walls to create rooms and hallways, we'll add floor tiles here
        var floorLayer = new Layer(settings.totalHeight, settings.totalWidth, -2, 'Floors', LayerType.Floor);

        // Add a layer for things that can be stepped on, or floor decorations,
        //    in-between the floor and the wall layer
        var floorDecorLayer = new Layer(settings.totalHeight, settings.totalWidth, -1, 'FloorDecorations', LayerType.FloorDecor);

        // The doors we'll have to place, as conceived during hallway carving
        var doorsToPlace: Door[] = [];

        // The rooms we're creating
        var rooms = [];
        // Our RNG
        var random = new Random(seed);
        // The number of rooms to place
        var randomRoomsToPlace = random.next(settings.minNumRooms, settings.maxNumRooms);

        var failedAttempts = 0;
        var preferSquareRooms = 1;

        // While we still have rooms to carve
        while (rooms.length < randomRoomsToPlace && failedAttempts < settings.retryAttempts) {
            // Create a new place to put it
            var randomPosition = new Point(
                random.next(0, settings.totalWidth),
                random.next(0, settings.totalHeight)
            );
            // Create a random size
            var randomWidth;
            var randomHeight;
            if (preferSquareRooms) {
                randomWidth = random.nextWeighted(settings.minRoomWidth, settings.maxRoomWidth);
                randomHeight = random.nextWeighted(settings.minRoomHeight, settings.maxRoomHeight);
            }
            else {
                randomWidth = random.next(settings.minRoomWidth, settings.maxRoomWidth);
                randomHeight = random.next(settings.minRoomHeight, settings.maxRoomHeight);
            }


            // Instantiate the room
            var newRoom = new Room(
                randomWidth,
                randomHeight,
                randomPosition
            );

            // If we can place it, then place it
            if (GenerationHelpers.canPlace(newRoom, rooms, settings.totalWidth, settings.totalHeight)) {
                // We can place this room, so draw it out
                GenerationHelpers.carveRoom(newRoom, wallLayer, floorLayer, settings.floorActorType, game);
                rooms.push(newRoom);
            }
            else {
                failedAttempts++;
                if (preferSquareRooms && failedAttempts >= settings.retryAttempts / 2) {
                    // If we're halfway through looking for spaces, stop preferring the bigger rooms
                    //  and give smaller rooms a shot
                    preferSquareRooms = 0;
                }
            }
        }

        // The rooms are now built. Start carving out the hallways

        // First lets order the rooms in somewhat in order of distance and before they're chained together
        var roomsOrdered = [];
        var roomBag = rooms.slice();
        var firstRoom = rooms.pickRandom(random);

        // Start with the first room at random
        var currentRoom = firstRoom;
        function distanceFromCurrentRoom(x, y) {
            return Point.getDistanceBetweenPoints(x.getCenter(), currentRoom.getCenter()) - Point.getDistanceBetweenPoints(y.getCenter(), currentRoom.getCenter());
        }
        // And then find the next closest one
        while (roomBag.length > 0) {
            // While we have rooms to add, search through the bag for the closest room to prevRoom
            currentRoom = roomBag.sort(distanceFromCurrentRoom).first();
            roomBag.remove(currentRoom);
            roomsOrdered.push(currentRoom);
        }
        rooms = roomsOrdered.slice();

        // Then carve each hallway out
        for (var i = 1; i < rooms.length; i++) {
            var room = rooms[i];
            var previousRoom = rooms[i - 1];

            GenerationHelpers.carveHallway(previousRoom, room, wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game, doorsToPlace);
        }

        // Then to keep it from being too linear, connect the second and second last rooms
        GenerationHelpers.carveHallway(rooms.second(), rooms.secondLast(), wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game, doorsToPlace);

        // Set and return the World so far
        world.addLayer(walLDecor);
        world.addLayer(wallLayer);
        world.addLayer(floorDecorLayer);
        world.addLayer(floorLayer);
        world.rooms = rooms;

        // Place doors
        GenerationHelpers.placeDoors(world, doorsToPlace);
        GenerationHelpers.removeStandaloneDoors(world);

        return world;
    }
}
