import { Action } from 'src/Actors/Behaviour/Action'
import { Command } from 'src/Actors/Behaviour/Command'
import { Enums } from 'src/Helpers/Enums'

export class Move extends Action {

    direction: Enums.Direction;
    tickDuration: number;
    executionType: Enums.ExecutionType;

    constructor(command: Command, direction: Enums.Direction) {
        super(command);
        this.direction = direction;
        this.tickDuration = this.command.actor.moveTickDuration;
        this.executionType = Enums.ExecutionType.ExecuteAndThenWait;
    }
    execute() {
        super.execute();
        this.getActor().move(this.direction);
    }
}
