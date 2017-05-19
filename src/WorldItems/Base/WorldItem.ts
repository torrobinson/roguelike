class WorldItem extends Actor {
    inventoryItem: InventoryItem;
    random: Random = null;
    useRandomSprite: boolean;
    randomSpriteIndex: number = 0;

    constructor(game: Game, random?: Random) {
        super(game);

        if (random) {
            // We want random sprites from the set
            this.random = random;
            this.useRandomSprite = true;
        }

        this.blocksSight = false;

        this.inventoryItem = null;
    }

    setSprite() {
        // Set the random sprite to use on creation
        if (this.useRandomSprite) {
            this.randomSpriteIndex = this.random.next(0, this.spritesets.first().sprites.length);
        }
    }

    getSprite() {
        if (this.useRandomSprite) {
            return this.spritesets.first().sprites[this.randomSpriteIndex];
        }
        else {
            return super.getSprite();
        }
    }

    pickedUpBy(actor: Actor) {
        if (this.inventoryItem !== null) {
            actor.obtainInventoryItem(this.inventoryItem);
        }
    }
}
