// Sprite defines a single, static image or text representation of something
export class Sprite {
    spriteName: string;
    character: string;
    tint: number;
    visible: boolean = true;

    constructor(spriteName: string, character: string) {
        this.spriteName = spriteName;
        this.character = character;
    }
}
