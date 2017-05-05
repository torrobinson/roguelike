class Floor extends Actor{
  constructor(game){
    super(game);
    this.sprites = FloorSprites;
    this.fogStyle = FogStyle.Darken;
  }
}
