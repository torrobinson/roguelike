import { Command } from 'src/Actors/Behaviour/Command'
import { Enums } from 'src/Helpers/Enums'

// Action represents an atomic instruction such as a single movement or attack or action
export class Action {
    command: Command;
    tickDuration: number = 1;
    executionType: Enums.ExecutionType = Enums.ExecutionType.WaitAndThenExecute;

    constructor(command: Command) {
        this.command = command;
    }

    getActor() {
        return this.command.actor;
    }

    execute() {
    }
}
