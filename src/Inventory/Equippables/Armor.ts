/// <reference path="../Base/InventoryItem.ts" />
class Shirt extends TorsoArmor {
    name: string = "Shirt";
    spritesets: SpriteSet[] = Sprites.ShirtSprites();

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
        this.setSprite();
    }
}

class Chestplate extends TorsoArmor {
    name: string = "Chestplate";
    spritesets: SpriteSet[] = Sprites.ChestplaceSprites();

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
        this.setSprite();
    }
}

class LeatherBoots extends FootArmor {
    name: string = "Leather Boots";
    spritesets: SpriteSet[] = Sprites.LeatherBootsSprites();

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
        this.setSprite();
    }
}

class SteelBoots extends FootArmor {
    name: string = "Steel Boots";
    spritesets: SpriteSet[] = Sprites.SteelBootsSprites();

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
        this.setSprite();
    }
}
