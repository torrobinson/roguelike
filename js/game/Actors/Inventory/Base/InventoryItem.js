class InventoryItem{
    constructor(holder){
        this.holder = holder;
        this.usesRemaining = 1;
    }

    use(){
        this.usesRemaining--;
        if(this.usesRemaining <= 0){
            this.holder.inventory.remove(this);
            delete this;
        }
    }
}
