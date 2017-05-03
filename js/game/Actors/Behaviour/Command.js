// Command represends a command given to the actor to perform
class Command{
  constructor(actor){
      this.actions = [];
      this.currentAction = null;
      this.lastAction = null;
      this.actor = actor;

      // Primarily for knowing if an ExecuteAndThenWait type action has executed already
      this.ignoreExecutionUntilNextFire = false;
  }

  addAction(action){
    this.actions.push(action);
    if(this.currentAction===null){
      this.setNextAction();
    }
  }

  setNextAction(){
    this.currentAction = this.popAction();
    if(this.currentAction !== null){
      this.actor.ticksUntilNextAction = this.currentAction.tickDuration;
    }
    else{
      this.actor.ticksUntilNextAction = null;
    }
  }

  removeAction(action){
    this.actions.remove(action);
  }

  insertAction(action,index){
    this.actions.insert(action,index);
    if(this.currentAction===null){
      this.setNextAction();
    }
  }

  popAction(){
    if(this.currentAction !== null) this.lastAction = this.currentAction;
    if(this.actions.length > 0){
      var nextAction = this.actions[0];
      this.actions.shift(); // pop off the next action from the stack
      return nextAction;
    }
    else{
      return null;
    }
  }

  execute(){
    if(this.currentAction !== null){
        this.currentAction.execute();
        this.currentAction = this.popAction();
    }
  }

  peekNextAction(){
    if(this.actions.length > 0){
      return this.actions[0];
    }
    else{
      return null;
    }
  }

  hasActionsRemaining(){
    return this.currentAction !== null || this.actions.length > 0;
  }
}
