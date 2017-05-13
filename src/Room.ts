import { Point } from 'src/Point'
import { Enums } from 'src/Helpers/Enums'

export class Room {
    width: number;
    height: number;
    position: Point; // position is the position of the top-left corner

    constructor(width: number, height: number, position: Point) {
        this.width = width;
        this.height = height;
        this.position = position;
    }

    getArea() {
        return this.width * this.height;
    }

    getCenter() {
        return new Point(Math.floor((this.left() + this.right()) / 2),
            Math.floor((this.top() + this.bottom()) / 2));
    }

    getSizeCategory() {
        var area = this.getArea();
        if (area < Enums.SizeCategory.Tiny)
            return Enums.SizeCategory.Tiny;
        else if (area < Enums.SizeCategory.Small)
            return Enums.SizeCategory.Small;
        else if (area < Enums.SizeCategory.Medium)
            return Enums.SizeCategory.Medium;
        else if (area < Enums.SizeCategory.Large)
            return Enums.SizeCategory.Large;
        else
            return Enums.SizeCategory.Huge;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.width;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.height;
    }

    topLeft() {
        return new Point(this.position.x, this.position.y);
    }

    topRight() {
        return new Point(this.position.x + this.width, this.position.y);
    }

    bottomLeft() {
        return new Point(this.position.x, this.position.y + this.height);
    }

    bottomRight() {
        return new Point(this.position.x + this.width, this.position.y + this.height);
    }

    static Intersects(a: Room, b: Room) {
        return (a.left() <= b.right() &&
            b.left() <= a.right() &&
            a.top() <= b.bottom() &&
            b.top() <= a.bottom());
    }

}
