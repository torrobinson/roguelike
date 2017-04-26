class Player extends Actor{

  constructor(game){
    super(game);
    this.character = 'O';
  }

  collidedWith(actor){
    // Call base Actor collision
    super.collidedWith(actor);
    // When the player touches the stairs, generate the next dungeon
    if(actor instanceof StairsDown){
      this.game.setRandomDungeon();
    }
  }

}
