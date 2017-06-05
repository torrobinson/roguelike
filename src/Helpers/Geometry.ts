// The callback type to call upon an actor that was collided into while projecting a bresenham line
type BresenhamCallback = (actor: Actor) => void;

class Geometry {

    // Use Pythagoras to check if a point is a certain distance away
    static IsPointInCircle(circleLocation: Point, circleRadius: number, point: Point) {
        if (circleLocation !== null && point !== null) {
            return Math.pow((point.x - circleLocation.x), 2) + Math.pow((point.y - circleLocation.y), 2) <= Math.pow(circleRadius, 2);
        }
    }

    static GetPointsInCircle(circleLocation: Point, circleRadius: number, layer: Layer): Point[] {
        var points: Point[] = [];

        for (let y = circleLocation.y - circleRadius; y < circleLocation.y + circleRadius; y++) {
            for (let x = circleLocation.x - circleRadius; x < circleLocation.x + circleRadius; x++) {
                if (y > 0 && y < layer.tiles.length && x > 0 && x < layer.tiles[y].length) {
                    var possiblePoint = new Point(x, y);
                    if (this.IsPointInCircle(circleLocation, circleRadius, possiblePoint)) {
                        points.push(possiblePoint);
                    }
                }
            }
        }

        return points;
    }

    static GetNearestFreePointTo(idealPoint: Point, onLayer: Layer, maxDistance: number) {
        var nearestPoint: Point = null;

        var checkRadius = 1;
        while (nearestPoint === null && checkRadius <= maxDistance) {
            var possiblyFreePoints: Point[] = this.GetPointsInCircle(idealPoint, checkRadius, onLayer);
            for (let p = 0; p < possiblyFreePoints.length; p++) {
                var possiblyFreePoint = possiblyFreePoints[p];
                if (onLayer.getTile(possiblyFreePoint.x, possiblyFreePoint.y) === null) {
                    nearestPoint = possiblyFreePoint;
                }
            }
            checkRadius++;
        }

        return nearestPoint;
    }

    static IsAdjacent(point1: Point, point2: Point) {
        return Math.abs(point2.x - point1.x) === 1 && Math.abs(point2.y - point1.y) === 1;
    }


    // Use Bresenham's Algorithm to check if a point can project onto another point
    //  in a straight line
    // This essentially keeps plotting along from point1 to point2 and if it encounters an
    //  occlusion, returns false
    static PointCanSeePoint(point1: Point, point2: Point, layer: Layer, callback: BresenhamCallback = null) {
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
            // Only check for occulusion if we're not on the first point or last point
            if ((point1Clone.x === initialStart.x && point1Clone.y === initialStart.y) === false && (point1Clone.x === initialEnd.x && point1Clone.y === initialEnd.y) === false) {
                var objectHit = layer.tiles[point1Clone.y][point1Clone.x];
                if (objectHit !== null && objectHit instanceof Actor && objectHit.blocksSight) { // we hit something not empty on the layer
                    if(callback !== null){
                      callback(objectHit);
                    }
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
