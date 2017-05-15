class WorldItem extends Actor {
    inventoryItem: InventoryItem;


    constructor(game: Game) {
        super(game);
        this.blocksSight = false;

        this.inventoryItem = null;
    }

    pickedUpBy(actor: Actor) {
        if (this.inventoryItem !== null) {
            actor.obtainInventoryItem(this.inventoryItem);
        }
    }
}
