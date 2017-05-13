class Carpet extends Actor{
  constructor(game){
    super(game);
    this.spritesets = CarpetSprites;
    this.fogStyle = FogStyle.Darken;
  }
}
