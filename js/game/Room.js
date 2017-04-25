Room = function(width, height, position){
    this.width = width;
    this.height = height;
    this.position = position; // position is the position of the top-left corner

    this.getArea = function(){
        return this.width*this.height;
    };

    this.getCenter = function(){
        return new Point(Math.floor((this.left() + this.right()) / 2),
            Math.floor((this.top() + this.bottom()) / 2));
    };

    this.getSizeCategory = function(){
        var area = this.getArea();
        if(area < 36)
            return Enums.SizeCategory.Tiny;
        else if(area < 81)
            return Enums.SizeCategory.Small;
        else if(area < 100)
            return Enums.SizeCategory.Medium;
        else if(area < 200)
            return Enums.SizeCategory.Large;
        else
            return Enums.SizeCategory.Huge;
    };

    this.left = function(){
        return this.position.x;
    };

    this.right = function(){
        return this.position.x + this.width;
    };

    this.top = function(){
        return this.position.y;
    };

    this.bottom = function(){
        return this.position.y + this.height;
    };

    this.topLeft = function(){
        return new Point(this.position.x, this.position.y);
    };

    this.topRight = function(){
        return new Point(this.position.x + this.width, this.position.y);
    };

    this.bottomLeft = function(){
        return new Point(this.position.x, this.position.y + this.height);
    };

    this.bottomRight = function(){
        return new Point(this.position.x + this.width, this.position.y + this.height);
    };

};

// Static methods
Room.Intersects = function(a,b){
    return (a.left() <= b.right() &&
      b.left() <= a.right() &&
      a.top() <= b.bottom() &&
      b.top() <= a.bottom());
};
