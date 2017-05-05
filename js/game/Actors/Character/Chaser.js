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

    var player = this.game.player;
    var self = this;

    // If we can see the player, then target them
    if(self.canSee(player)){
        var command = new MoveTo(
            self,
            player.location
        );
        if(self.currentCommand !== null){
            // Retarget the player
            self.interruptWithCommand(command);
        }
        else{
            self.addCommand(command);
        }
    }
    else{
        // Can't see the player
        if(this.currentCommand instanceof MoveTo){
          this.cancelCurrentCommand();
        }
    }


  }

}
