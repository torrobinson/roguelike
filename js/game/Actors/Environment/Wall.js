class Wall extends Actor{
  constructor(game){
    super(game);
    this.sprites = WallSprites;
    this.fogStyle = FogStyle.Darken;
  }
}
