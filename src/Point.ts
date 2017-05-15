class Point{

  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  static getDistanceBetweenPoints(point1: Point, point2: Point){
    return Math.sqrt((point1.x-point2.x)*(point1.x-point2.x) + (point1.y-point2.y)*(point1.y-point2.y));
  }

  offsetBy(x: number, y: number){
    return new Point(this.x+x, this.y+y);
  }

  reverse(){
      var y = this.y;
      this.y = this.x;
      this.x = y;
  }
}
