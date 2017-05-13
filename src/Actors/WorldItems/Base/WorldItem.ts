import { Actor } from 'src/Actors/Actor'
import { Game } from 'src/Game'
import { InventoryItem } from 'src/Actors/Inventory/Base/InventoryItem'

export class WorldItem extends Actor {
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
