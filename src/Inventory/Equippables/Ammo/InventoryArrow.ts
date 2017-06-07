/// <reference path="../../Base/InventoryItem.ts" />
class InventoryArrow extends Ammo {
    spritesets: SpriteSet[] = Sprites.ArrowSprites();
    constructor(random: Random) {
        super(random);
        this.name = 'Arrow';
        this.setSprite();
    }
}
