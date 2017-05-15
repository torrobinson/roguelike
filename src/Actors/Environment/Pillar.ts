class Pillar extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.PillarSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}
