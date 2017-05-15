class Floor extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.FloorSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
