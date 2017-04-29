class Move extends Action{
  constructor(command, direction){
    super(command);
    this.direction = direction;
    this.tickDuration=this.command.actor.moveTickDuration;
    this.executionType = ExecutionType.ExecuteAndThenWait;
  }
  execute(){
    super.execute();
    this.getActor().move(this.direction);
  }
}
