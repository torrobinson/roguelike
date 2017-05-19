class InventoryItem {
    holder: Actor = null;
    name: string = '';

    constructor(holder?: Actor) {
        if (holder) {
            this.holder = holder;
        }
    }
}


class Consumable extends InventoryItem {
    usesRemaining: number = 1;

    constructor(holder?: Actor) {
        super(holder);
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
    constructor(holder?: Actor) {
        super(holder);
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
    constructor(holder?: Actor) {
        super(holder);
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
    constructor(holder?: Actor) {
        super(holder);
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

class Gauntlets extends Armor {
    name: string = 'Gauntlets';
    equipPoint: EquipPoint = EquipPoint.Hands;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Pants extends Armor {
    name: string = 'Pants';
    equipPoint: EquipPoint = EquipPoint.Legs;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Greaves extends Armor {
    name: string = 'Greaves';
    equipPoint: EquipPoint = EquipPoint.Legs;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Helmet extends Armor {
    name: string = 'Helmet';
    equipPoint: EquipPoint = EquipPoint.Head;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Shirt extends Armor {
    name: string = 'Shirt';
    equipPoint: EquipPoint = EquipPoint.Torso;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Chestplate extends Armor {
    name: string = 'Chestplate';
    equipPoint: EquipPoint = EquipPoint.Torso;

    constructor(holder?: Actor) {
        super(holder);
    }
}

class Boots extends Armor {
    name: string = 'Boots';
    equipPoint: EquipPoint = EquipPoint.Feet;

    constructor(holder?: Actor) {
        super(holder);
    }
}



// Implementations
class WeakShirt extends Shirt {
    name: string = "Weak Shirt";
    maxHealthBuff: number = 5;
    constructor(holder?: Actor) {
        super(holder);
    }
}

class StrongShirt extends Shirt {
    name: string = "Strong Shirt";
    maxHealthBuff: number = 15;
    constructor(holder?: Actor) {
        super(holder);
    }
}
