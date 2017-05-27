class Room {
    width: number;
    height: number;
    position: Point; // position is the position of the top-left corner

    constructor(width: number, height: number, position: Point) {
        this.width = width;
        this.height = height;
        this.position = position;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getCenter(): Point {
        return new Point(Math.floor((this.left() + this.right()) / 2),
            Math.floor((this.top() + this.bottom()) / 2));
    }

    getSizeCategory(): SizeCategory {
        var area = this.getArea();
        if (area < SizeCategory.Tiny)
            return SizeCategory.Tiny;
        else if (area < SizeCategory.Small)
            return SizeCategory.Small;
        else if (area < SizeCategory.Medium)
            return SizeCategory.Medium;
        else if (area < SizeCategory.Large)
            return SizeCategory.Large;
        else
            return SizeCategory.Huge;
    }

    left(): number {
        return this.position.x;
    }

    right(): number {
        return this.position.x + this.width;
    }

    top(): number {
        return this.position.y;
    }

    bottom(): number {
        return this.position.y + this.height;
    }

    topLeft(): Point {
        return new Point(this.position.x, this.position.y);
    }

    topRight(): Point {
        return new Point(this.position.x + this.width, this.position.y);
    }

    bottomLeft(): Point {
        return new Point(this.position.x, this.position.y + this.height);
    }

    bottomRight(): Point {
        return new Point(this.position.x + this.width, this.position.y + this.height);
    }

    static Intersects(a: Room, b: Room): boolean {
        return (a.left() <= b.right() &&
            b.left() <= a.right() &&
            a.top() <= b.bottom() &&
            b.top() <= a.bottom());
    }

}
