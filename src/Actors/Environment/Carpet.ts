class Carpet extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.CarpetSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
