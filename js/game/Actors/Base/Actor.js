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

  isMoving(){
      // Either we're waiting to move
      if(this.currentCommand !== null && this.currentCommand.currentAction !== null && this.currentCommand.currentAction instanceof Move)
        return true;

      // Or we last moved
      if(this.currentCommand !== null && this.currentCommand.currentAction === null && this.currentCommand.lastAction instanceof Move)
        return true;

      return false;
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

  addCommand(command){
    this.commands.push(command);
    if(this.currentCommand===null){
        //set as next action immediately
        this.currentCommand = this.popCommand();
    }
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
        // Immediately decrease the ticks remaining for the next action
        if(this.ticksUntilNextAction !== null){
          this.ticksUntilNextAction--;
        }

        // If we have a command that we're about to wait on, execute it now if preferred
        // If the current action needs to fire immediately and then wait, do so
        if(this.currentCommand !== null && this.currentCommand.currentAction !== null){
          if(this.currentCommand.currentAction.executionType === ExecutionType.ExecuteAndThenWait){
            this.currentCommand.execute();
          }
        }

        // If we can fire the next action that we've been waiting for, do so
        if(this.ticksUntilNextAction !==null && this.ticksUntilNextAction <= 0){
          if(this.currentCommand !== null){
            if(this.currentCommand.currentAction !== null){

              // If this is a late-fire action, then fire it now
              if(this.currentCommand.currentAction.executionType === ExecutionType.WaitAndThenExecute){
                  this.currentCommand.execute();
              }



            }

            // We're no longer waiting on anything
            this.ticksUntilNextAction = null;

            // Now that the action is done, check if we need to set the next one up
            var nextAction = this.currentCommand.currentAction;
            if(nextAction !== null){
                this.ticksUntilNextAction = nextAction.tickDuration;
            }
            else{
              // Otherwise, clear away our current command to accept the future one
              this.currentCommand = null;
            }
          }

        }


        // If we're not waiting on anything now, set up the next command
        if(this.currentCommand === null){
          if(this.commands.length > 0){
            this.currentCommand =this.popCommand();
            this.ticksUntilNextAction =   this.currentCommand.currentAction.tickDuration;
          }
        }

  }

  destroy(){
    // any teardowns to perform when being destroyed
  }
}
