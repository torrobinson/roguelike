class InventoryItem {
    holder: Actor = null;
    protected name: string = '';
    spritesets: SpriteSet[] = null;
    randomSpriteIndex: number = 0;
    random: Random;

    constructor(random: Random) {
        this.random = random;
    }

    getName() {
        return this.name;
    }

    setSprite() {
        // Set the random sprite to use on creation
        this.randomSpriteIndex = this.random.next(0, this.spritesets.first().sprites.length - 1);
    }

    getSprite() {
        if (this.spritesets !== null) {
            return this.spritesets.first().sprites[this.randomSpriteIndex];
        }
        else {
            return null;
        }
    }
}

class Ammo extends InventoryItem {
    static friendlyName: string = 'Ammo';
    constructor(random: Random) {
        super(random);
    }
}


class Consumable extends InventoryItem {
    usesRemaining: number = 1;

    constructor(random: Random) {
        super(random);
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
    buffs: Buff[] = [];
    isEquipped: boolean = false;
    constructor(random: Random) {
        super(random);
    }
    equip() {
        this.isEquipped = true;
    }

    giveHolderBuffs() {
        // Apply any buffs with remaining uses
        this.buffs
            .where((buff) => {
                return buff.getUsesRemaining() > 0
            })
            .forEach((buff) => {
                this.holder.addBuff(
                    buff, // the buff
                    this  // who granted.caused it
                )
            });
        this.cleanEmptyBuffs();
    }

    removeHolderBuffs() {
        // Remove any buffs
        this.buffs.forEach((buff) => { this.holder.removeBuff(buff) });
        this.cleanEmptyBuffs();
    }

    unequip() {
        this.isEquipped = false;
        this.removeHolderBuffs();
    }

    cleanEmptyBuffs() {
        this.buffs
            .where((buff) => {
                return buff.getUsesRemaining() <= 0
            })
            .forEach((buff) => {
                this.removeBuff(buff)
            });
    }

    // Override to include buff name
    getName() {
        if (this.buffs.any() && this.buffs.first().getUsesRemaining() > 0) {
            return this.name + ' of ' + this.buffs.first().namePart;
        }
        else {
            return this.name;
        }
    }

    addBuff(buff: Buff) {
        this.buffs.push(buff);
    }

    removeBuff(buff: Buff) {
        this.buffs.remove(buff);
    }
}

class Weapon extends Equipment {
    static friendlyName: string = 'Weapon';
    attackPower: number = 0;
    equipPoint: EquipPoint = EquipPoint.Weapon;
    constructor(random: Random) {
        super(random);
    }

    equip() {
        // Toggle if this is what is equipped
        if (this.holder.equippedWeapon === this) {
            this.unequip();
            return;
        }
        else {
            // Unequip anything already in this spot
            if (this.holder.equippedWeapon !== null) {
                this.holder.equippedWeapon.unequip();
            }
        }
        this.holder.equippedWeapon = this;
        this.giveHolderBuffs();
        this.isEquipped = true;
    }

    unequip() {
        this.holder.equippedWeapon = null;
        super.unequip();
    }
}

class Armor extends Equipment {
    maxHealthBuff: number = 0;
    constructor(healthBuff: number, random: Random) {
        super(random);
        this.maxHealthBuff = healthBuff;
    }

    equip() {
        // Toggle off is this item is already equipped
        if (this.equipPoint === EquipPoint.Feet && this.holder.equippedFeet === this) {
            this.holder.equippedFeet.unequip();
            return;
        }
        if (this.equipPoint === EquipPoint.Hands && this.holder.equippedHands === this) {
            this.holder.equippedHands.unequip();
            return;
        }
        if (this.equipPoint === EquipPoint.Head && this.holder.equippedHead === this) {
            this.holder.equippedHead.unequip();
            return;
        }
        if (this.equipPoint === EquipPoint.Legs && this.holder.equippedLegs === this) {
            this.holder.equippedLegs.unequip();
            return;
        }
        if (this.equipPoint === EquipPoint.Torso && this.holder.equippedTorso === this) {
            this.holder.equippedTorso.unequip();
            return;
        }

        // Otherwise unequip anything already in this spot
        if (this.equipPoint === EquipPoint.Feet && this.holder.equippedFeet !== null) {
            this.holder.equippedFeet.unequip();
        }
        if (this.equipPoint === EquipPoint.Hands && this.holder.equippedHands !== null) {
            this.holder.equippedHands.unequip();
        }
        if (this.equipPoint === EquipPoint.Head && this.holder.equippedHead !== null) {
            this.holder.equippedHead.unequip();
        }
        if (this.equipPoint === EquipPoint.Legs && this.holder.equippedLegs !== null) {
            this.holder.equippedLegs.unequip();
        }
        if (this.equipPoint === EquipPoint.Torso && this.holder.equippedTorso !== null) {
            this.holder.equippedTorso.unequip();
        }

        // Then equip this
        this.updateHolder(this.equipPoint, this, true);
        this.isEquipped = true;
        this.giveHolderBuffs();
    }

    unequip() {
        super.unequip();
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

class HandArmor extends Armor { //Gauntlets
    static friendlyName: string = 'Hand Armor';
    equipPoint: EquipPoint = EquipPoint.Hands;

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
    }
}

class LegArmor extends Armor { //Pants
    static friendlyName: string = 'Leg Armor';
    equipPoint: EquipPoint = EquipPoint.Legs;

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
    }
}

class HeadArmor extends Armor { //Helmet
    static friendlyName: string = 'Head Armor';
    equipPoint: EquipPoint = EquipPoint.Head;

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
    }
}

class TorsoArmor extends Armor { //Shirt
    static friendlyName: string = 'Torso Armor';
    equipPoint: EquipPoint = EquipPoint.Torso;

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
    }
}

class FootArmor extends Armor { //Boots
    static friendlyName: string = 'Foot Armor';
    equipPoint: EquipPoint = EquipPoint.Feet;

    constructor(healthBuff: number, random: Random) {
        super(healthBuff, random);
    }
}
