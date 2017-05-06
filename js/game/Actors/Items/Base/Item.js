class Item extends Actor{
    constructor(game){
        super(game);
        this.blocksSight = false;

        this.inventoryItem = null;
    }

    pickedUpBy(actor){
        if(this.inventoryItem !== null){
            actor.obtainInventoryItem(this.inventoryItem);
        }
    }
}
