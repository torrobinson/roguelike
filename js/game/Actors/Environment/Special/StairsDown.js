class StairsDown extends Actor{
  constructor(game){
    super(game);
    this.sprites = StairsDownSprites;
    this.fogStyle = FogStyle.Hide;
    this.blocksSight = false;
  }
}
