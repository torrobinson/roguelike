import { Actor } from 'src/Actors/Actor'
import { Game } from 'src/Game'
import { Enums } from 'src/Helpers/Enums'
import { ChestSprites } from 'src/Actors/Sprites/WorldItems/ChestSprites'
import { InventoryItem } from 'src/Actors/Inventory/Base/InventoryItem'
import { WorldItem } from 'src/Actors/WorldItems/Base/WorldItem'

export class Chest extends WorldItem {
    contents: InventoryItem[];

    constructor(game: Game, contents?: InventoryItem[]) {
        if (!contents) {
            var contents: InventoryItem[] = [];
        }
        super(game);

        this.spritesets = ChestSprites;
        this.contents = contents; //array of contents
        this.inventoryItem = null; // rather than 1 item, a chest picks up many
        this.status = Enums.ActorStatus.Closed;
    }

    openedBy(actor: Actor) {
        if (this.status === Enums.ActorStatus.Closed) {
            for (var i = 0; i < this.contents.length; i++) {
                var item = this.contents[i];
                actor.obtainInventoryItem(item);
            }
            this.contents = null;
            this.status = Enums.ActorStatus.Open;
        }
    }

    pickedUpBy(actor: Actor) {
        //super(by);
        // Override pickedUp with method to deliver the contents
        this.openedBy(actor);
    }
}
