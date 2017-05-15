class StairsUp extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.StairsUpSprites();
        this.fogStyle = FogStyle.Hide;
        this.blocksSight = false;
    }
}
