/// <reference path="./Base/InventoryItem.ts" />
class Potion extends InventoryItem {
    healAmount: number;

    constructor(holder?: Actor) {
        super(holder);
        this.name = 'Potion';
        this.healAmount = 10;
    }

    use() {
        super.use();
        if (this.holder !== null) {
            this.holder.health += this.healAmount;
            if (this.holder.health > this.holder.startingHealth) {
                this.holder.health = this.holder.startingHealth;
            }
        }
    }
}
