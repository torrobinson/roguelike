class InventoryItem {
    holder: Actor = null;
    usesRemaining: number = 1;
    name: string = '';

    constructor(holder?: Actor) {
        if (holder) {
            this.holder = holder;
        }
    }

    use() {
        this.usesRemaining--;
        if (this.usesRemaining <= 0) {
            this.holder.inventory.remove(this);
        }
    }
}
