class Bookshelf extends Actor{
  constructor(game){
    super(game);
    this.spritesets = BookshelfSprites;
    this.fogStyle = FogStyle.Darken;
    this.blocksSight = false;
  }
}
