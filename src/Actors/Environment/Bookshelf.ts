class Bookshelf extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.BookshelfSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}
