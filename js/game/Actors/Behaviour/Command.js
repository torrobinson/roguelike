// Command represends a command given to the actor to perform
class Command{
  constructor(actor){
      this.actions = [];
      this.currentAction = null;
      this.actor = actor;
  }

  addAction(action){
    this.actions.push(action);
  }

  removeAction(action){
    this.actions.remove(action);
  }

  insertAction(action,index){
    this.actions.insert(action,index);
  }

  popAction(){
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
