// Command represends a command given to the actor to perform
class Command{
  constructor(){
      this.actions = [];
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
    var nextAction = this.actions[0];
    this.actions.shift(); // pop off the next action from the stack
    return nextAction;
  }
}
