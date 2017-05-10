class Pillar extends Actor{
  constructor(game){
    super(game);
    this.spritesets = PillarSprites;
    this.fogStyle = FogStyle.Darken;
    this.blocksSight = false;
  }
}
