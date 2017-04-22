Point = function(x,y){
  this.x = x;
  this.y = y;
};

Point.getDistanceBetweenPoints=function(point1,point2){
  return Math.hypot(point1.x-point2.x, point1.y-point2.y);
};

Point.sortPointsByDistanceFromOrigin=function(originPoint, points){
    return points.concat().sort(
      function(a,b){
        return Point.getDistanceBetweenPoints(a,originPoint) - Point.getDistanceBetweenPoints(b,originPoint);
      }
    );
};

// create a collection of points
var myPoint = new Point(79,2);

var otherPoints = [];
otherPoints.push(new Point(100,0));
otherPoints.push(new Point(80,0));
otherPoints.push(new Point(2,1));
otherPoints.push(new Point(1000,0));

// And find the closest otherPoint to myPoint;
var closestPoint = Point.sortPointsByDistanceFromOrigin(myPoint,otherPoints).first();

console.log(closestPoint.x + ',' + closestPoint.y);
