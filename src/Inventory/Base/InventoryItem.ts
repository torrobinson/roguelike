class InventoryItem {
    holder: Actor = null;
    name: string = '';
    spritesets: SpriteSet[] = null;

    constructor() {

    }

    getSprite() {
        if (this.spritesets !== null) {
            return this.spritesets.first().getSprite(false);
        }
        else {
            return null;
        }
    }
}


class Consumable extends InventoryItem {
    usesRemaining: number = 1;

    constructor() {
        super();
    }

    use() {
        this.usesRemaining--;
        if (this.usesRemaining <= 0) {
            this.holder.inventory.remove(this);
        }
    }
}

class Equipment extends InventoryItem {
    equipPoint: EquipPoint;
    isEquipped: boolean = false;
    constructor() {
        super();
    }
    equip() {
        this.isEquipped = true;
    }

    unqeuip() {
        this.isEquipped = false;
    }
}

class Weapon extends Equipment {
    attackPower: number = 0;
    equipPoint: EquipPoint = EquipPoint.Weapon;
    constructor() {
        super();
    }

    equip() {
        super.equip();

        // Toggle if this is what is equipped
        if (this.holder.equippedWeapon === this) {
            this.unqeuip();
            return;
        }
        else {
            // Unequip anything already in this spot
            if (this.holder.equippedWeapon !== null) {
                this.holder.equippedWeapon.unqeuip();
            }
        }
    }

    unqeuip() {
        super.unqeuip();
    }
}

class Armor extends Equipment {
    maxHealthBuff: number = 0;
    constructor(healthBuff: number) {
        super();
        this.maxHealthBuff = healthBuff;
    }

    equip() {
        super.equip();

        // Toggle off is this item is already equipped
        if (this.equipPoint === EquipPoint.Feet && this.holder.equippedFeet === this) {
            this.holder.equippedFeet.unqeuip();
            return;
        }
        if (this.equipPoint === EquipPoint.Hands && this.holder.equippedHands === this) {
            this.holder.equippedHands.unqeuip();
            return;
        }
        if (this.equipPoint === EquipPoint.Head && this.holder.equippedHead === this) {
            this.holder.equippedHead.unqeuip();
            return;
        }
        if (this.equipPoint === EquipPoint.Legs && this.holder.equippedLegs === this) {
            this.holder.equippedLegs.unqeuip();
            return;
        }
        if (this.equipPoint === EquipPoint.Torso && this.holder.equippedTorso === this) {
            this.holder.equippedTorso.unqeuip();
            return;
        }

        // Otherwise unequip anything already in this spot
        if (this.equipPoint === EquipPoint.Feet && this.holder.equippedFeet !== null) {
            this.holder.equippedFeet.unqeuip();
        }
        if (this.equipPoint === EquipPoint.Hands && this.holder.equippedHands !== null) {
            this.holder.equippedHands.unqeuip();
        }
        if (this.equipPoint === EquipPoint.Head && this.holder.equippedHead !== null) {
            this.holder.equippedHead.unqeuip();
        }
        if (this.equipPoint === EquipPoint.Legs && this.holder.equippedLegs !== null) {
            this.holder.equippedLegs.unqeuip();
        }
        if (this.equipPoint === EquipPoint.Torso && this.holder.equippedTorso !== null) {
            this.holder.equippedTorso.unqeuip();
        }

        // Then equip this
        this.updateHolder(this.equipPoint, this, true);
    }

    unqeuip() {
        super.unqeuip();
        this.updateHolder(this.equipPoint, null, false);

        // Lower the heatlh down if this is buffing it beyond max
        if (this.holder.health > this.holder.maxHealth()) {
            this.holder.health = this.holder.maxHealth();
        }
    }

    updateHolder(point: EquipPoint, armor: Armor, equipped: boolean) {
        switch (point) {
            case EquipPoint.Head:
                this.holder.equippedHead = equipped ? armor : null;
                break;
            case EquipPoint.Torso:
                this.holder.equippedTorso = equipped ? armor : null;
                break;
            case EquipPoint.Legs:
                this.holder.equippedLegs = equipped ? armor : null;
                break;
            case EquipPoint.Hands:
                this.holder.equippedHands = equipped ? armor : null;
                break;
            case EquipPoint.Feet:
                this.holder.equippedFeet = equipped ? armor : null;
                break;
        }
    }
}

class GloveArmor extends Armor { //Gauntlets
    name: string = 'Gauntlets';
    equipPoint: EquipPoint = EquipPoint.Hands;

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class LegArmor extends Armor { //Pants
    name: string = 'Pants';
    equipPoint: EquipPoint = EquipPoint.Legs;

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class HeadArmor extends Armor { //Helmet
    name: string = 'Helmet';
    equipPoint: EquipPoint = EquipPoint.Head;

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class TorsoArmor extends Armor { //Shirt
    name: string = 'Shirt';
    equipPoint: EquipPoint = EquipPoint.Torso;

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class FootArmor extends Armor { //Boots
    name: string = 'Boots';
    equipPoint: EquipPoint = EquipPoint.Feet;

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}



// Implementations
class Shirt extends TorsoArmor {
    name: string = "Shirt";
    spritesets: SpriteSet[] = Sprites.ShirtSprites();

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class Chestplate extends TorsoArmor {
    name: string = "Chestplate";
    spritesets: SpriteSet[] = Sprites.ChestplaceSprites();

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class LeatherBoots extends FootArmor {
    name: string = "Leather Boots";
    spritesets: SpriteSet[] = Sprites.LeatherBootsSprites();

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}

class SteelBoots extends FootArmor {
    name: string = "Steel Boots";
    spritesets: SpriteSet[] = Sprites.SteelBootsSprites();

    constructor(healthBuff: number) {
        super(healthBuff);
    }
}
