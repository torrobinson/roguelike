// Sprite defines a single, static image or text representation of something
class Sprite {
    spriteName: string;
    tint: number;
    visible: boolean = true;
    originOffset: Point;

    constructor(spriteName: string, originOffset = new Point(0, 0)) {
        this.spriteName = spriteName;
        this.originOffset = originOffset
    }
}
