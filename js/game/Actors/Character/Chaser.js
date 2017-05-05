class Chaser extends Actor{

  constructor(game){
    super(game);
    this.moveTickDuration = 2;
    this.viewRadius = 20;
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
    if(Geometry.IsAdjacent(self.location, player.location)){
      // Attack player
    }
    else{
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
          // Can't see the player.
          // They'll finish their current move to where the last saw yiy
      }
    }
  }
}
