class Room{
  constructor(width, height, position){
    this.width = width;
    this.height = height;
    this.position = position; // position is the position of the top-left corner
  }

    getArea(){
        return this.width*this.height;
    }

    getCenter(){
        return new Point(Math.floor((this.left() + this.right()) / 2),
            Math.floor((this.top() + this.bottom()) / 2));
    }

    getSizeCategory(){
        var area = this.getArea();
        if(area < 36)
            return SizeCategory.Tiny;
        else if(area < 81)
            return SizeCategory.Small;
        else if(area < 100)
            return SizeCategory.Medium;
        else if(area < 200)
            return SizeCategory.Large;
        else
            return SizeCategory.Huge;
    }

    left(){
        return this.position.x;
    }

    right(){
        return this.position.x + this.width;
    }

    top(){
        return this.position.y;
    }

    bottom(){
        return this.position.y + this.height;
    }

    topLeft(){
        return new Point(this.position.x, this.position.y);
    }

    topRight(){
        return new Point(this.position.x + this.width, this.position.y);
    }

    bottomLeft(){
        return new Point(this.position.x, this.position.y + this.height);
    }

    bottomRight(){
        return new Point(this.position.x + this.width, this.position.y + this.height);
    }

    static Intersects(a,b){
        return (a.left() <= b.right() &&
          b.left() <= a.right() &&
          a.top() <= b.bottom() &&
          b.top() <= a.bottom());
    }

}
