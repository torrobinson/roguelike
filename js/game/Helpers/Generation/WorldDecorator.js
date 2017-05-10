class WorldDecoratorSettings{
	constructor(){
		this.minNumberOfChests = 0;
		this.maxNumberOfChests = 2;
		this.minNumberOfChestContents = 1;
		this.maxNumberOfChestContents = 3;
	}
}

class WorldDecorator{
    constructor(settings, seed){
      this.settings = settings;
      this.random = new Random(seed);
    }

    decorate(world){
      this.setAjdacentWallStatuses(world);
      this.decorateAllRooms(world);
    }

    setAjdacentWallStatuses(world){
        var layer = world.getLayersOfType(LayerType.Wall).first();
        if(layer!== undefined && layer!==null){
            for(var y=0; y<layer.tiles.length; y++){
                for(var x=0; x<layer.tiles[y].length; x++){
                    var tile = layer.getTile(x,y);
                    if(tile instanceof Wall){
                        tile.facing = WorldDecoratorHelpers.getTileAdjacencyBitmask(layer, tile.location, Wall);
                    }
                }
            }
        }
    }

    decorateAllRooms(world){
      // Shuffle the rooms
      var rooms = world.rooms.shuffle(this.random);

      // For each room
      for(var r=0; r<rooms.length; r++){
        // Decorate it
        this.decorateRoom(world, rooms[r]);
      }
    }

    decorateRoom(world, room){
      // Pick a random room type
      var roomType = WorldDecoratorHelpers.randomEnumValue(RoomDecorationTypes,this.random);
      var wallLayer = world.getLayersOfType(LayerType.Wall).first();

      // NOTHING
      if(roomType === RoomDecorationTypes.Nothing){
        // Do nothing
      }

      // ATRIUM
      else if(roomType === RoomDecorationTypes.Atrium && room.width >=5){
        // Build columns down the sides, padded by 1
        WorldDecoratorHelpers.decorateVerticallyDownWalls(
          wallLayer,
          room,
          1,    // ensures what is placed always has 1 space free around it
          Pillar
        );
      }

      // LIBRARY
      else if(roomType === RoomDecorationTypes.Library && room.width >=3){
        // Build bookshelves down the sides, against the walls (padded by 0)
        //  - Avoid blocking exits and entrances
        WorldDecoratorHelpers.decorateVerticallyDownWalls(
          wallLayer,
          room,
          0,
        Bookshelf
        );
      }

    }

}
