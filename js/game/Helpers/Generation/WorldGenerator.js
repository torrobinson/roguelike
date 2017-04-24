GenerateCarvedWorldSettings = function(){
  this.totalWidth = 0;
  this.totalHeight = 0;
  this.minRoomWidth = 0;
  this.maxRoomWidth = 0;
  this.minRoomHeight = 0;
  this.maxRoomHeight = 0;
  this.minNumRooms = 0;
  this.maxNumRooms = 0;
  this.minHallThickness = 0;
  this.maxHallThickness = 0;
  this.retryAttempts = 0;
  this.floorActor = null;
};

WorldGenerator = function(){};
// Generate a World object
WorldGenerator.GenerateCarvedWorld = function(
    seed,
    settings
){
    // The world to return
    var world = new World(settings.totalWidth, settings.totalHeight);

    // Set up the main collision layer as ALL walls
    var wallLayer = new Layer(settings.totalHeight, settings.totalWidth, 0, 'Main', Enums.LayerType.Main);
    wallLayer.fillWith(new Wall());

    // Create a new empty floor layer.
    // As we carve away the walls to create rooms and hallways, we'll add floor tiles here
    var floorLayer = new Layer(settings.totalHeight, settings.totalWidth, -1, 'Floors', Enums.LayerType.Floor);

    // The rooms we're creating
    var rooms = [];
    // Our RNG
    var random = new Random(seed);
    // The number of rooms to place
    var randomRoomsToPlace = random.next(settings.minNumRooms, settings.maxNumRooms);

    var failedAttempts = 0;
    var preferSquareRooms = 1;

    // While we still have rooms to carve
    while(rooms.length < randomRoomsToPlace && failedAttempts < settings.retryAttempts){
        // Create a new place to put it
        var randomPosition = new Point(
            random.next(0, settings.totalWidth),
            random.next(0, settings.totalHeight)
        );
        // Create a random size
        var randomWidth;
        var randomHeight;
        if(preferSquareRooms){
            randomWidth = random.nextWeighted(settings.minRoomWidth, settings.maxRoomWidth);
            randomHeight = random.nextWeighted(settings.minRoomHeight, settings.maxRoomHeight);
        }
        else{
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
        if(canPlace(newRoom, rooms, settings.totalWidth, settings.totalHeight)){
            // We can place this room, so draw it out
            carveRoom(newRoom, wallLayer, floorLayer, settings.floorActor);
            rooms.push(newRoom);
        }
        else{
            failedAttempts++;
            if(preferSquareRooms && failedAttempts >= settings.retryAttempts/2){
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

        carveHallway(previousRoom, room, wallLayer, floorLayer, settings.floorActor, settings.minHallThickness, settings.maxHallThickness, random);
    }

    // Then to keep it from being too linear, conect the second and second last rooms
    carveHallway(rooms.second(), rooms.secondLast(), wallLayer, floorLayer, settings.floorActor, settings.minHallThickness, settings.maxHallThickness, random);

    // Set and return the World so far
    world.addLayer(wallLayer);
    world.addLayer(floorLayer);
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

// Carve the Room out of Actor on a Layer
function carveRoom(room, wallLayer, floorLayer, floorActor){
    for(var y = room.top(); y<room.bottom(); y++){
        for(var x = room.left(); x<room.right(); x++){
            // Carve out the walls
            wallLayer.setTile(x,y, null);

            // Place a floor
            floorLayer.setTile(x,y, floorActor);
        }
    }
}

// Given 2 Rooms, create a hallway made of Actor at given thicknesses on a Layer
function carveHallway(room1, room2, wallLayer, floorLayer, floorActor, minHallThickness, maxHallThickness, random){
    var prevCenter = room1.getCenter();
    var newCenter = room2.getCenter();

    // We want to get a random number between
    var hallThickness = Numbers.roundToOdd(
        random.next(minHallThickness, maxHallThickness)
    );

    // Draw a corridor between me and the last room
    var horizontalFirst = random.next(0,2);

    if(horizontalFirst){
       carveHorizontalHallway(prevCenter.x, newCenter.x, prevCenter.y, hallThickness, wallLayer, floorLayer, floorActor);
       carveVerticalHallway(prevCenter.y, newCenter.y,newCenter.x, hallThickness, wallLayer, floorLayer, floorActor);
    }
    else{
        //vertical first
        carveVerticalHallway(prevCenter.y,newCenter.y,prevCenter.x, hallThickness, wallLayer, floorLayer, floorActor);
        carveHorizontalHallway(prevCenter.x,newCenter.x,newCenter.y, hallThickness, wallLayer, floorLayer, floorActor);
    }
}

// Carve a horizontal hallway at a given Y, from a given X to X2, on a Layer, and fill with an Actor
function carveHorizontalHallway(x1, x2, y, thickness, wallLayer, floorLayer,  floorActor){
    // bulk to add on either side of hallway if thickness > 1
    var bulk = thickness==1?0:(thickness-1)/2;
    for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1 + bulk; x++) {
        if(thickness==1){
            // Carve to null from the walls
            wallLayer.setTile(x,y,null);

            // Add the floor tile
            floorLayer.setTile(x,y,floorActor);
        }
        else{
            for(var o=bulk; o>-bulk; o--){
                // Carve to null from the walls
                wallLayer.setTile(x,y+o,null);

                // Add the floor tile
                floorLayer.setTile(x,y+o,floorActor);
            }
        }
    }
}

// Carve a horizontal hallway at a given X, from a given Y to Y2, on a Layer, and fill with an Actor
function carveVerticalHallway(y1, y2, x, thickness, wallLayer, floorLayer, floorActor){
    // bulk to add on either side of hallway if thickness > 1
    var bulk = thickness==1?0:(thickness-1)/2;
    for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
        if(thickness==1){
            // Carve to null from the walls
            wallLayer.setTile(x,y,null);

            // Add the floor tile
            floorLayer.setTile(x,y,floorActor);
        }
        else{
            for(var o=bulk; o>-bulk; o--){
                // Carve to null from the walls
                wallLayer.setTile(x+o,y,null);

                // Add the floor tile
                floorLayer.setTile(x+o,y,floorActor);
            }
        }
    }
}
