class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  static getDistanceBetweenPoints(point1,point2){
    return Math.sqrt((point1.x-point2.x)*(point1.x-point2.x) + (point1.y-point2.y)*(point1.y-point2.y));
  }

  offsetBy(x, y){
    return new Point(this.x+x, this.y+y);
  }

  reverse(){
      var y = this.y;
      this.y = this.x;
      this.x = y;
  }
}
