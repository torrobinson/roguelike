class Wall extends Actor{
  constructor(game){
    super(game);
    this.spritesets = WallSprites;
    this.fogStyle = FogStyle.Darken;
  }
}
