class Player extends Actor{

  constructor(game){
    super(game);
    this.character = 'O';
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
