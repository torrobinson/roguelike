class Player extends Actor{

  constructor(game){
    super(game);
    this.moveTickDuration = 1;
    this.doesSubscribeToTicks = true;

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

  tickWorld(){
    this.game.gameTick(this.game);
  }

}
