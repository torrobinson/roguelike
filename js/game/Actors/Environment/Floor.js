class Floor extends Actor{
  constructor(game){
    super(game);
    this.spritesets = FloorSprites;
    this.fogStyle = FogStyle.Darken;
  }
}
