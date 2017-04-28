class Actor{
  constructor(game){
    // Actors must be born with awareness of the game they are in
    this.game = game;

    // Relating to the game world
    this.facing = Directions.Down;
    this.character = ' ';
    this.location = null;
    this.layer = null;

    // Actor Commands
    this.commands = [];
    this.currentCommand = null;
    this.ticksUntilNextAction = null;
  }

  move(direction){
    this.facing = direction;
    var offsetToMove = Movement.DirectionToOffset(direction);
    if(this.layer !== null){
      var moveTo = Movement.AddPoints(this.location, offsetToMove);
      var result = Movement.TryMove(this,this.layer,moveTo);
      if(result){
        // Moved

      }
      else{
        // Collided
        var actorHit = this.layer.getTile(moveTo.x,moveTo.y);
        this.collidedInto(actorHit);
        actorHit.collidedBy(this);
      }
    }
  }

  // Generic action to perform when any collision happened
  collided(){

  }

  // When tried to move into another object
  collidedInto(actor){
    this.collided();

  }

  // When another object tried to move into me
  collidedBy(actor){
    this.collided();

  }

  popCommand(){
    if(this.commands.length > 0){
      var nextCommand = this.commands[0];
      this.commands.shift(); // pop off the next action from the stack
      return nextCommand;
    }
    else{
      return null;
    }
  }

  // On game timer tick
  tick(){
    // If we're not on a command, get on one
    if(this.currentCommand === null){
      if(commands.length > 0){
        this.currentCommand =this.popCommand();

        // If the current action needs to fire immediately and then wait, do so
        if(this.currentCommand.currentAction !== null){
          if(this.currentCommand.currentAction.executionType === ExecutionType.ExecuteAndThenWait){
            this.currentCommand.execute();
          }
        }

      }
      else{
        this.currentCommand = null;
      }
    }

    // If we're on a command, try execute it
    if(this.currentCommand !== null && this.currentCommand.hasActionsRemaining()){

      // If the timer reached 0
      if(this.ticksUntilNextAction === 0){

        // Only execute if we execute after timer reaches 0
        if(this.currentCommand.currentAction.executionType === ExecutionType.WaitAndThenExecute){
            this.currentCommand.execute();
        }

        var nextAction = this.currentCommand.peekNextAction();
        if(nextAction !== null){
            this.ticksUntilNextAction = this.peekNextAction.currentAction.tickDuration;
        }
        else{
          this.ticksUntilNextAction = null;
        }
      }
      else{
        if(this.ticksUntilNextAction !== null){
            this.ticksUntilNextAction--;
        }
      }
    }
    else{
      this.currentCommand = this.popCommand();
      this.ticksUntilNextAction = this.currentCommand.currentAction.tickDuration;
    }
  }

  destroy(){
    // any teardowns to perform when being destroyed
  }
}
