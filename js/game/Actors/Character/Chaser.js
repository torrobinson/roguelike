class Chaser extends Actor{

  constructor(game){
    super(game);
    this.moveTickDuration = 4;
    this.doesSubscribeToTicks = true;
    this.sprites = PlayerSprites;
  }

  collidedInto(actor){
    // Call base Actor collision
    super.collidedInto(actor);
    // When the player touches the stairs, generate the next dungeon
    alert('You were caught!');
    this.game.setRandomDungeon();
  }

  tick(){
    super.tick();

    // Retarget the player
    this.clearCommands();
    this.addCommand(
      new MoveTo(
        this,
        this.game.player.location
      )
    );
  }

}
