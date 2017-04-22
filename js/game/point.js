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
