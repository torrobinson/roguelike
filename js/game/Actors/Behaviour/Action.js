// Action represents an atomic instruction such as a single movement or attack or action
class Action{
  constructor(command){
    this.command = command;

    // by default, wait until the action duration has happened and then execute the event
    this.executionType = ExecutionType.WaitAndThenExecute;

    // default to take place over 1 tick
    this.tickDuration = 1;
  }

  getActor(){
    return this.command.actor;
  }

  execute(){}
}
