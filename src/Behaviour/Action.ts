// Action represents an atomic instruction such as a single movement or attack or action
class Action {
    command: Command;
    tickDuration: number = 1;
    executionType: ExecutionType = ExecutionType.WaitAndThenExecute;

    constructor(command: Command) {
        this.command = command;
    }

    getActor() {
        return this.command.actor;
    }

    execute() {
    }
}
