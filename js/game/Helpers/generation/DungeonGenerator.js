DungeonGenerator = function(){};

// Generate a World object
DungeonGenerator.Generate = function(
    seed,
    totalWidth,
    totalHeight,
    minRoomWidth,
    maxRoomWidth,
    minRoomHeight,
    maxRoomHeight,
    minNumRooms,
    maxNumRooms,
    minHallThickness,
    maxHallThickness,
    retryAttempts // The number of times to try find another spot for a room, should a new room placement fail. The larger this is, the slower this function but the more packed the dungeon will be with room
){
    // The world to return
    var world = new World(totalWidth, totalHeight);

    // Set up the main collission layer as ALL walls
    var wallLayer = new Layer(totalHeight, totalWidth, 0);
    wallLayer.fillWith(new Wall());

    // The rooms we're creating
    var rooms = [];
    // Our RNG
    var random = new Random(seed);
    // The number of rooms to place
    var randomRoomsToPlace = random.next(minNumRooms, maxNumRooms);

    var failedAttempts = 0;
    var preferSquareRooms = 1;

    // While we still have rooms to carve
    while(rooms.length < randomRoomsToPlace && failedAttempts < retryAttempts){
        // Create a new place to put it
        var randomPosition = new Point(
            random.next(0, totalWidth),
            random.next(0, totalHeight)
        );
        // Create a random size
        var randomWidth;
        var randomHeight;
        if(preferSquareRooms){
            randomWidth = random.nextWeighted(minRoomWidth, maxRoomWidth);
            randomHeight = random.nextWeighted(minRoomHeight, maxRoomHeight);
        }
        else{
            randomWidth = random.next(minRoomWidth, maxRoomWidth);
            randomHeight = random.next(minRoomHeight, maxRoomHeight);
        }


        // Instantiate the room
        var newRoom = new Room(
            randomWidth,
            randomHeight,
            randomPosition
        );

        // If we can place it, then place it
        if(canPlace(newRoom, rooms, totalWidth, totalHeight)){
            // We can place this room, so draw it out
            carveRoom(newRoom, wallLayer);
            rooms.push(newRoom);
        }
        else{
            failedAttempts++;
            if(preferSquareRooms && failedAttempts >= retryAttempts/2){
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
    var firstRoom = rooms.pickRandom();

    // Start with the first room at random
    var currentRoom = firstRoom;
    function distanceFromCurrentRoom(x, y)
    {
        return Point.getDistanceBetweenPoints(x.getCenter(), currentRoom.getCenter()) - Point.getDistanceBetweenPoints(y.getCenter(), currentRoom.getCenter());
    }
    // And then find the next closest one
    while(roomBag.length > 0){
        // While we have rooms to add, search through the bag for the closest room to prevRoom
        currentRoom = roomBag.sort(distanceFromCurrentRoom).first();
        roomBag.remove(currentRoom);
        roomsOrdered.push(currentRoom);
    }
    rooms = roomsOrdered.slice();

    // Then carve each hallway out
    for(var i=1; i<rooms.length;i++){
        var room = rooms[i];
        var previousRoom = rooms[i-1];

        carveHallway(previousRoom, room, wallLayer, minHallThickness, maxHallThickness, random);
    }

    // Then to keep it from being too linear, conect the second and second last rooms
    carveHallway(rooms.second(), rooms.secondLast(), wallLayer, minHallThickness, maxHallThickness, random);

    // Set and return the World so far
    world.addLayer(wallLayer);
    world.rooms = rooms;

    return world;
};


// One-off Helpers
function canPlace(room, rooms, totalWidth, totalHeight){
    // Check if it goes out of bounds
    // the 1 and -1s are to ensure that they dont also touch the exact edge, but stay 1 away
    if(room.left() < 1 || room.right() > totalWidth -1 || room.top() < 1 || room.bottom() > totalHeight - 1){
        return false;
    }

    // Check for intersections with any other room
    for(var i=0; i<rooms.length;i++){
        otherRoom = rooms[i];
        if(Room.Intersects(room, otherRoom)){
            return false;
        }
    }
    return true;
}

// Carve the room out of the 2d array of tiles
function carveRoom(room, layer){
    for(var y = room.top(); y<room.bottom(); y++){
        for(var x = room.left(); x<room.right(); x++){
            layer.setTile(x,y, new Floor());
        }
    }
}

function carveHallway(room1, room2, layer, minHallThickness, maxHallThickness, rng){
    var prevCenter = room1.getCenter();
    var newCenter = room2.getCenter();

    // We want to get a random number between
    var hallThickness = Numbers.roundToOdd(
        rng.next(minHallThickness, maxHallThickness)
    );

    // Draw a corridor between me and the last room
    var horizontalFirst = rng.next(0,2);

    if(horizontalFirst){
       carveHorizontalHallway(prevCenter.x, newCenter.x, prevCenter.y, hallThickness, layer, new Floor());
       carveVerticalHallway(prevCenter.y, newCenter.y,newCenter.x, hallThickness, layer, new Floor());
    }
    else{
        //vertical first
        carveVerticalHallway(prevCenter.y,newCenter.y,prevCenter.x, hallThickness, layer, new Floor());
        carveHorizontalHallway(prevCenter.x,newCenter.x,newCenter.y, hallThickness, layer, new Floor());
    }
}

function carveHorizontalHallway(x1, x2, y, thickness, layer, floorActor){
    // bulk to add on either side of hallway if thickness > 1
    var bulk = thickness==1?0:(thickness-1)/2;
    for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1 + bulk; x++) {
        if(thickness==1){
            layer.setTile(x,y,floorActor);
        }
        else{
            for(var o=bulk; o>-bulk; o--){
                layer.setTile(x,y+o,floorActor);
            }
        }
    }
}
function carveVerticalHallway(y1, y2, x, thickness, layer, floorActor){
    // bulk to add on either side of hallway if thickness > 1
    var bulk = thickness==1?0:(thickness-1)/2;
    for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
        if(thickness==1){
            layer.setTile(x,y,floorActor);
        }
        else{
            for(var o=bulk; o>-bulk; o--){
                layer.setTile(x+o,y,floorActor);
            }
        }
    }
}
