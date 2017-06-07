/// <reference path="./Base/WorldItem.ts" />
/// <reference path="../Sprites/Sprites.ts" />
class DroppedArrow extends WorldItem {
    constructor(game: Game, random?: Random) {
        super(game, random);
        this.spritesets = Sprites.ArrowSprites();
        this.status = ActorStatus.Idle;
        this.setSprite();
        this.inventoryItem = new InventoryArrow(random);
    }
}
