class StairsDown extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.StairsDownSprites();
        this.fogStyle = FogStyle.Hide;
        this.blocksSight = false;
    }
}
