class Actor{
  constructor(game){
    // Actors must be born with awareness of the game they are in
    this.game = game;

    // Relating to the game world
    this.facing = Directions.Down;
    this.location = null;
    this.layer = null;

    // Actor Commands
    this.commands = [];
    this.currentCommand = null;
    this.ticksUntilNextAction = null;
    this.doesSubscribeToTicks = false;

    // Resources
    this.sprites = null;

    // Attributes. Override if needed on children.
    this.viewRadius = 10;
  }

  getSprite(){
    if(this.sprites !== null){
      var status = null;
      if(this.isMoving()){
        status = ActorStatus.Moving;
      }
      else{
        status = ActorStatus.Idle;
      }
      return this.sprites.filter(function(sprite){
        return sprite.status === status &&
          sprite.direction === this.facing
      }, this).first();
    }
    else{
      return null;
    }
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

  cancelCurrentCommand(){
      this.currentCommand = null;
  }

  addCommand(command){
    this.commands.push(command);
    if(this.currentCommand===null){
        //set as next action immediately
        this.currentCommand = this.popCommand();
        // When we add a command normally, set it up to execute immediately
        this.currentCommand.setNextActionIfEmpty();
    }
  }

  clearCommands(){
    this.commands = [];
    this.currentCommand = null;
    this.ticksUntilNextAction = null;
  }

  // When we interrupt with a new command, we shouldn't clear away the currentCommand
  //
  interruptWithCommand(command){
    // Backup the current ticks until next action
    var ticksUntilNextAction = this.ticksUntilNextAction;
    var ignoreExecutionUntilNextFire = this.currentCommand.ignoreExecutionUntilNextFire;

    // Wipe the current commands
    this.clearCommands();
    this.addCommand(command);

    // And restore
    this.currentCommand.ignoreExecutionUntilNextFire = ignoreExecutionUntilNextFire;
    this.ticksUntilNextAction = ticksUntilNextAction;
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
          if(this.currentCommand.ignoreExecutionUntilNextFire === false && this.currentCommand.currentAction.executionType === ExecutionType.ExecuteAndThenWait){
            this.currentCommand.execute();
            if(this.currentCommand !== null){
                this.currentCommand.ignoreExecutionUntilNextFire = true;
            }
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
              this.currentCommand.ignoreExecutionUntilNextFire = false;
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
            if(this.currentCommand !== null && this.currentCommand.currentAction !== null){
                this.ticksUntilNextAction =   this.currentCommand.currentAction.tickDuration;
            }
          }
        }

  }

  canSee(actor){
      // If they're within the view distance and aren't hidden behind anything
      return Geometry.IsPointInCircle(this.location, this.viewRadius, actor.location) &&
             Geometry.PointCanSeePoint(this.location, actor.location, this.layer);
  }

  canBeSeenBy(actor){
      // Inverse of canSee from the other perspective
      return Geometry.IsPointInCircle(actor.location, actor.viewRadius, this.location) &&
             Geometry.PointCanSeePoint(actor.location, this.location, this.layer);
  }

  destroy(){
    // any teardowns to perform when being destroyed
  }
}
