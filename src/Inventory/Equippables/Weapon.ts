/// <reference path="../Base/InventoryItem.ts" />
class Dagger extends Weapon {
    name: string = "Dagger";
    attackPower: number = 2;
    spritesets: SpriteSet[] = Sprites.DaggerSprites();

    constructor(random: Random, attackPower: number) {
        super(random);
        this.attackPower = attackPower;
    }
}

class Projectile extends Weapon {
    successRatePercent: number = 0;
    ammoType: any;

    constructor(random: Random, attackPower: number) {
        super(random);
        this.attackPower = attackPower;
    }
}

class Bow extends Projectile {
    name: string = "Bow";
    attackPower: number = 2;
    successRatePercent: number = 75;
    spritesets: SpriteSet[] = Sprites.BowSprites();
    ammoType: any = InventoryArrow;

    constructor(random: Random, attackPower: number) {
        super(random, attackPower);
    }
}
