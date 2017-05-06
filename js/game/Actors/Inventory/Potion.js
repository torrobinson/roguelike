class Potion extends InventoryItem{
    constructor(holder){
        super(holder);
        this.name = 'Potion';
        this.healAmount = 10;
    }

    use(){
        if(this.holder !== null){
            this.holder.health += this.healAmount;
        }

        this.usesRemaining--;
    }
}
