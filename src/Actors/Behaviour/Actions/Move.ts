class Move extends Action {

    direction: Direction;
    tickDuration: number;
    executionType: ExecutionType;

    constructor(command: Command, direction: Direction) {
        super(command);
        this.direction = direction;
        this.tickDuration = this.command.actor.moveTickDuration;
        this.executionType = ExecutionType.ExecuteAndThenWait;
    }
    execute() {
        super.execute();
        this.getActor().move(this.direction);
    }
}
