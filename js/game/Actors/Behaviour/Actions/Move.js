class Move extends Action{
  constructor(command, direction){
    super(command);
    this.direction = direction;
  }
  execute(){
    super.execute();
    this.getActor().move(this.direction);
  }
}
