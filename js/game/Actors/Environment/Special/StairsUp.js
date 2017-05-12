class StairsUp extends Actor{
  constructor(game){
    super(game);
    this.spritesets = StairsUpSprites;
    this.fogStyle = FogStyle.Hide;
    this.blocksSight = false;
  }
}
