class Geometry{

    // Use Pythagoras to check if a point is a certain distance away
    static IsPointInCircle(circleLocation, circleRadius, point){
        return Math.pow((point.x - circleLocation.x),2) + Math.pow((point.y - circleLocation.y),2) <= Math.pow(circleRadius,2);
    }

	static IsAdjacent(point1, point2){
		return Math.abs(point2.x-point1.x) === 1 && Math.abs(point2.y-point1.y) === 1;
	}

    // Use Bresenham's Algorithm to check if a point can project onto another point
    //  in a straight line
    // This essentially keeps plotting along from point1 to point2 and if it encounters an
    //  occlusion, returns false
    static PointCanSeePoint(point1, point2, layer){
		// Clone these to compare against the initial input
		var initialStart = point1.clone();
		var initialEnd = point2.clone();

		// Clone these, as the alorithm modifies them during the loop
		var point1 = point1.clone();
		var point2 = point2.clone();

		var dx = Math.abs(point2.x-point1.x);
		var dy = Math.abs(point2.y-point1.y);
		var sx = (point1.x < point2.x) ? 1 : -1;
		var sy = (point1.y < point2.y) ? 1 : -1;
		var err = dx-dy;
		while(true){
			// Only check for occulusion if we're not on the first point
			if((point1.x === initialStart.x && point1.y === initialStart.y) === false && (point1.x === initialEnd.x && point1.y === initialEnd.y) === false){
				 if(layer.tiles[point1.y][point1.x] instanceof Wall){ // we hit something not empty on the layer
					return false;
				 }
			}
			if ((point1.x==point2.x) && (point1.y==point2.y)) break;
			var e2 = 2*err;
			if (e2 >-dy){ err -= dy; point1.x  += sx; }
			if (e2 < dx){ err += dx; point1.y  += sy; }
		}
		return true; // the line was fully drawn
	}

	// Dummy helper for now to visualize visibility
	// on tick:
	// self.game.world.layers.remove(
	// 	self.game.world.getLayersOfType(LayerType.Effects).first()
	// );
	// self.game.world.addLayer(
	// 	Geometry.GetVisibleTiles(self.location, self.layer)
	// );
	// will add an effects layer showing visibility.
	// rafactor this to take in a layer and modify its tile's illumination attribute to later deal with lighting
	//		or visibility
	static GetVisibleTiles(point,layer){
		var outputLayer = new Layer(layer.height, layer.width, 999, 'ChaserSees', LayerType.Effects);
		outputLayer.fillWith(null);
		// Clone these to compare against the initial input
		var grid = layer.tiles;
		for(var y=0; y<grid.length;y++){
			for(var x=0; x<grid[y].length;x++){
				var initialStart = point.clone();
				var initialEnd = new Point(x,y);
				// Clone these, as the alorithm modifies them during the loop
				var point1 = initialStart.clone();
				var point2 = initialEnd.clone();

				var dx = Math.abs(point2.x-point1.x);
				var dy = Math.abs(point2.y-point1.y);
				var sx = (point1.x < point2.x) ? 1 : -1;
				var sy = (point1.y < point2.y) ? 1 : -1;
				var err = dx-dy;
				var keepLooking = true;
				while(keepLooking === true){
					// Only check for occulusion if we're not on the first or last point
					if((point1.x === initialStart.x && point1.y === initialStart.y) === false){
					 if( !(layer.tiles[point1.y][point1.x] instanceof Wall) && Geometry.IsPointInCircle(new Point(point1.x, point1.y), 10, point)){ // we hit something not empty on the layer
						outputLayer.tiles[point1.y][point1.x] = new StairsDown();
					 }
					 else{
						keepLooking = false;
					 }
					}
					if ((point1.x==point2.x) && (point1.y==point2.y)) break;
					var e2 = 2*err;
					if (e2 >-dy){ err -= dy; point1.x  += sx; }
					if (e2 < dx){ err += dx; point1.y  += sy; }
				}
				if(!keepLooking){continue;}
			}
		}
		return outputLayer;
	}
}
