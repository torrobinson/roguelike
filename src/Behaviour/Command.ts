class Command {
    actions: Action[];
    currentAction: Action;
    lastAction: Action;
    actor: Actor;
    ignoreExecutionUntilNextFire: boolean

    constructor(actor: Actor) {
        this.actions = [];
        this.currentAction = null;
        this.lastAction = null;
        this.actor = actor;

        // Primarily for knowing if an ExecuteAndThenWait type action has executed already
        this.ignoreExecutionUntilNextFire = false;
    }

    addAction(action: Action) {
        this.actions.push(action);
    }


    setNextActionIfEmpty() {
        if (this.currentAction === null) {
            this.currentAction = this.popAction();
            if (this.currentAction !== null) {
                this.actor.ticksUntilNextAction = this.currentAction.tickDuration;
            }
            else {
                this.actor.ticksUntilNextAction = null;
            }
        }
    }

    removeAction(action: Action) {
        this.actions.remove(action);
    }

    insertAction(action: Action, index: number) {
        this.actions.insert(action, index);
        this.setNextActionIfEmpty();
    }

    popAction() {
        if (this.currentAction !== null) this.lastAction = this.currentAction;
        if (this.actions.length > 0) {
            var nextAction = this.actions[0];
            this.actions.shift(); // pop off the next action from the stack
            return nextAction;
        }
        else {
            return null;
        }
    }

    execute() {
        if (this.currentAction !== null) {
            this.currentAction.execute();
            this.currentAction = this.popAction();
        }
    }

    peekNextAction() {
        if (this.actions.length > 0) {
            return this.actions[0];
        }
        else {
            return null;
        }
    }

    hasActionsRemaining() {
        return this.currentAction !== null || this.actions.length > 0;
    }
}
