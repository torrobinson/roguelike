class Player extends Actor{

  constructor(game){
    super(game);
    this.moveTickDuration=3;
    this.ticks=true;

    this.sprites = PlayerSprites;
  }

  collidedInto(actor){
    // Call base Actor collision
    super.collidedInto(actor);
    // When the player touches the stairs, generate the next dungeon
    if(actor instanceof StairsDown){
      this.game.setRandomDungeon();
    }
  }

  tick(){
    super.tick();
  }

}
