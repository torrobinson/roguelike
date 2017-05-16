/// <reference path="./Base/WorldItem.ts" />
/// <reference path="../Sprites/Sprites.ts" />

class Chest extends WorldItem {
    contents: InventoryItem[];

    constructor(game: Game, contents?: InventoryItem[]) {
        if (!contents) {
            var contents: InventoryItem[] = [];
        }
        super(game);

        this.spritesets = Sprites.ChestSprites();
        this.contents = contents; //array of contents
        this.inventoryItem = null; // rather than 1 item, a chest picks up many
        this.status = ActorStatus.Closed;
    }

    openedBy(actor: Actor) {
        if (this.status === ActorStatus.Closed) {
            for (var i = 0; i < this.contents.length; i++) {
                var item = this.contents[i];
                actor.obtainInventoryItem(item);
            }
            this.contents = null;
            this.status = ActorStatus.Open;
        }
    }

    pickedUpBy(actor: Actor) {
        //super(by);
        // Override pickedUp with method to deliver the contents
        this.openedBy(actor);
    }
}
