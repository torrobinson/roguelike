class Geometry {

    // Use Pythagoras to check if a point is a certain distance away
    static IsPointInCircle(circleLocation: Point, circleRadius: number, point: Point) {
        if (circleLocation !== null && point !== null) {
            return Math.pow((point.x - circleLocation.x), 2) + Math.pow((point.y - circleLocation.y), 2) <= Math.pow(circleRadius, 2);
        }
    }

    static IsAdjacent(point1: Point, point2: Point) {
        return Math.abs(point2.x - point1.x) === 1 && Math.abs(point2.y - point1.y) === 1;
    }

    // Use Bresenham's Algorithm to check if a point can project onto another point
    //  in a straight line
    // This essentially keeps plotting along from point1 to point2 and if it encounters an
    //  occlusion, returns false
    static PointCanSeePoint(point1: Point, point2: Point, layer: Layer) {
        // Clone these to compare against the initial input
        var initialStart = point1.clone();
        var initialEnd = point2.clone();

        // Clone these, as the alorithm modifies them during the loop
        var point1Clone = point1.clone();
        var point2Clone = point2.clone();

        var dx = Math.abs(point2Clone.x - point1Clone.x);
        var dy = Math.abs(point2Clone.y - point1Clone.y);
        var sx = (point1Clone.x < point2Clone.x) ? 1 : -1;
        var sy = (point1Clone.y < point2Clone.y) ? 1 : -1;
        var err = dx - dy;
        while (true) {
            // Only check for occulusion if we're not on the first point
            if ((point1Clone.x === initialStart.x && point1Clone.y === initialStart.y) === false && (point1Clone.x === initialEnd.x && point1Clone.y === initialEnd.y) === false) {
                var objectHit = layer.tiles[point1Clone.y][point1Clone.x];
                if (objectHit !== null && objectHit instanceof Actor && objectHit.blocksSight) { // we hit something not empty on the layer
                    return false;
                }
            }
            if ((point1Clone.x == point2Clone.x) && (point1Clone.y == point2Clone.y)) break;
            var e2 = 2 * err;
            if (e2 > -dy) { err -= dy; point1Clone.x += sx; }
            if (e2 < dx) { err += dx; point1Clone.y += sy; }
        }
        return true; // the line was fully drawn
    }


    static getBrightnessForPoint(point: Point, lightsource: Point, maxViewDistance: number, maxReturnValue: number, fallOffFunction: any) {
        return fallOffFunction(
            Math.hypot(point.x - lightsource.x, point.y - lightsource.y),
            maxViewDistance,
            maxReturnValue);
    }

}
