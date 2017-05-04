class Chaser extends Actor{

  constructor(game){
    super(game);
    this.moveTickDuration = 2;
    this.doesSubscribeToTicks = true;
    this.sprites = PlayerSprites;
  }

  collidedInto(actor){
    // Call base Actor collision
    super.collidedInto(actor);

    if(actor instanceof Player){
        alert('You were caught!');
        this.game.setRandomDungeon();
    }
  }

  tick(){
    super.tick();
    var self = this;
    var command = new MoveTo(
      this,
      this.game.player.location
    );
    if(self.currentCommand != null){
      // Retarget the player
      self.interruptWithCommand(command);
    }
    else{
      self.addCommand(command);
    }
  }

}
