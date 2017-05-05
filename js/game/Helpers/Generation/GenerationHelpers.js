class GenerationHelpers{
  // One-off Helpers Functions
  static canPlace(room, rooms, totalWidth, totalHeight){
      // Check if it goes out of bounds
      // the 1 and -1s are to ensure that they dont also touch the exact edge, but stay 1 away
      if(room.left() < 1 || room.right() > totalWidth -1 || room.top() < 1 || room.bottom() > totalHeight - 1){
          return false;
      }

      // Check for intersections with any other room
      for(var i=0; i<rooms.length;i++){
          var otherRoom = rooms[i];
          if(Room.Intersects(room, otherRoom)){
              return false;
          }
      }
      return true;
  }

  // Carve the Room out of Actor on a Layer
  static carveRoom(room, wallLayer, floorLayer, floorActorType, gameReference){
      for(var y = room.top(); y<room.bottom(); y++){
          for(var x = room.left(); x<room.right(); x++){
              // Carve out the walls
              wallLayer.placeActor(null, new Point(x,y));

              // Place a floor
              var actor = new floorActorType(gameReference);
              floorLayer.placeActor(actor, new Point(x,y));
          }
      }
  }

  // Given 2 Rooms, create a hallway made of Actor at given thicknesses on a Layer
  static carveHallway(room1, room2, wallLayer, floorLayer, floorActorType, minHallThickness, maxHallThickness, random, gameReference){
      var prevCenter = room1.getCenter();
      var newCenter = room2.getCenter();

      // We want to get a random number between
      var hallThickness = Numbers.roundToOdd(
          random.next(minHallThickness, maxHallThickness)
      );

      // Draw a corridor between me and the last room
      var horizontalFirst = random.next(0,2);

      if(horizontalFirst){
         GenerationHelpers.carveHorizontalHallway(prevCenter.x, newCenter.x, prevCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
         GenerationHelpers.carveVerticalHallway(prevCenter.y, newCenter.y,newCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
      }
      else{
          //vertical first
          GenerationHelpers.carveVerticalHallway(prevCenter.y,newCenter.y,prevCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
          GenerationHelpers.carveHorizontalHallway(prevCenter.x,newCenter.x,newCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
      }
  }

  // Carve a horizontal hallway at a given Y, from a given X to X2, on a Layer, and fill with an Actor
  static carveHorizontalHallway(x1, x2, y, thickness, wallLayer, floorLayer,  floorActorType, gameReference){
      // bulk to add on either side of hallway if thickness > 1
      var bulk = thickness==1?0:(thickness-1)/2;
      for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1 + bulk; x++) {
          if(thickness==1){
              // Carve to null from the walls
              wallLayer.placeActor(null, new Point(x,y));

              // Add the floor tile
              var actor = new floorActorType(gameReference);
              floorLayer.placeActor(actor, new Point(x,y));
          }
          else{
              for(var o=bulk; o>-bulk; o--){
                  // Carve to null from the walls
                  wallLayer.placeActor(null, new Point(x,y+o));

                  // Add the floor tile
                  var actor = new floorActorType(gameReference);
                  floorLayer.placeActor(actor, new Point(x,y+o));
              }
          }
      }
  }

  // Carve a horizontal hallway at a given X, from a given Y to Y2, on a Layer, and fill with an Actor
  static carveVerticalHallway(y1, y2, x, thickness, wallLayer, floorLayer, floorActorType, gameReference){
      // bulk to add on either side of hallway if thickness > 1
      var bulk = thickness==1?0:(thickness-1)/2;
      for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
          if(thickness==1){
              // Carve to null from the walls
              wallLayer.placeActor(null, new Point(x,y));

              // Add the floor tile
              var actor = new floorActorType(gameReference);
              floorLayer.placeActor(actor, new Point(x,y));
          }
          else{
              for(var o=bulk; o>-bulk; o--){
                  // Carve to null from the walls
                  wallLayer.placeActor(null, new Point(x+o,y));

                  // Add the floor tile
                  var actor = new floorActorType(gameReference);
                  floorLayer.placeActor(actor, new Point(x+o,y));
              }
          }
      }
  }
}
