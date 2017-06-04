/// <reference path="../Base/InventoryItem.ts" />
class Potion extends Consumable {
    healAmount: number;
    spritesets: SpriteSet[] = Sprites.PotionSprites();
    constructor(random: Random) {
        super(random);
        this.name = 'Potion';
        this.healAmount = 10;
        this.setSprite();
    }

    use() {
        super.use();
        if (this.holder !== null) {
            this.holder.heal(this.healAmount);
        }
    }
}
