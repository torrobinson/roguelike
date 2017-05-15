class Wall extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.WallSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
