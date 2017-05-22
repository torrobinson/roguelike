class CrossGrave extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.CrossGraveSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}

class Tombstone extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.TombstoneSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}
