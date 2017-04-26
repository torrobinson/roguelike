class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  static getDistanceBetweenPoints(point1,point2){
    return Math.hypot(point1.x-point2.x, point1.y-point2.y);
  }
}
