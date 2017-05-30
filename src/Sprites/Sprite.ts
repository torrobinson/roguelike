// Sprite defines a single, static image or text representation of something
class Sprite {
    spriteName: string;
    tint: number;
    visible: boolean = true;

    constructor(spriteName: string) {
        this.spriteName = spriteName;
    }
}
