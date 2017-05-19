/// <reference path="./Base/WorldItem.ts" />
/// <reference path="../Sprites/Sprites.ts" />
class GoldPile extends WorldItem {

    goldCount: number = 1;

    constructor(game: Game, goldCount: number, random?: Random) {
        super(game, random);
        this.spritesets = Sprites.GoldPileSprites();
        this.status = ActorStatus.Idle;
        this.setSprite();

        this.goldCount = goldCount; //array of contents
        this.inventoryItem = null; // rather than 1 item, a chest picks up many
    }

    pickedUpBy(actor: Actor) {
        //super(by);
        // Override pickedUp with method to deliver the contents
        if (actor instanceof Player) {
            (<Player>actor).giveGold(this.goldCount);
            this.game.log('You found ' + this.goldCount + ' gold');
        }
    }

}
