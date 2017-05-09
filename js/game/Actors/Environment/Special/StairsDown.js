class StairsDown extends Actor{
  constructor(game){
    super(game);
    this.spritesets = StairsDownSprites;
    this.fogStyle = FogStyle.Hide;
    this.blocksSight = false;
  }
}
