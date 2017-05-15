class Actor {
    game: Game;
    facing: Direction = Direction.Down;
    location: Point = null;
    layer: Layer = null;
    commands: Command[] = [];
    currentCommand: Command = null;
    ticksUntilNextAction: number = null;
    doesSubscribeToTicks: boolean = false;
    moveTickDuration: number = 1;
    spritesets: SpriteSet[] = null;
    name: string = '';
    status: ActorStatus = ActorStatus.Idle;
    viewRadius: number = 5;
    defaultAttackPower: number = 1;
    inventory: InventoryItem[] = [];
    equippedWeapon: InventoryItem = null;
    fogged: boolean = true;
    fogStyle: FogStyle = FogStyle.Hide;
    blocksSight: boolean = true;
    restartSpriteNextFrame: boolean = false;
    startingHealth: number = undefined;
    health: number = this.startingHealth;
    world: World = null;

    constructor(game: Game) {
        // Actors must be born with awareness of the game they are in
        this.game = game;
    }

    getSprite() {
        if (this.spritesets !== null) {
            var sprite = this.spritesets.filter(
                function(spriteset) {
                    return spriteset.status === this.status && spriteset.direction === this.facing
                }, this).first().getSprite(this.restartSpriteNextFrame);
            this.restartSpriteNextFrame = false;
            return sprite;
        }
        else {
            return null;
        }
    }

    isMoving() {
        return this.status === ActorStatus.Moving;
    }

    attack(otherActor: Actor, damage: number) {
        otherActor.attackedBy(this, damage);
    }

    attackedBy(attacker: Actor, damage: number) {
        this.health -= damage;
        // Did we die?
        if (this.health <= 0) {
            // Notify the attacker
            attacker.madeKill(this);

            // And then die
            this.die();
        }
    }

    madeKill(killedActor: Actor) {

    }

    die() {
        this.layer.setTile(this.location.x, this.location.y, null);
        this.destroy();
    }

    move(direction: Direction) {
        this.facing = direction;
        var offsetToMove = Movement.DirectionToOffset(direction);
        if (this.layer !== null) {
            var moveTo = Movement.AddPoints(this.location, offsetToMove);
            var result = Movement.TryMove(this, this.layer, moveTo);
            if (result) {
                // Moved

            }
            else {
                // Collided
                var actorHit = this.layer.getTile(moveTo.x, moveTo.y);
                this.collidedInto(actorHit);
                actorHit.collidedBy(this);
            }
        }
        this.restartSpriteNextFrame = true;
    }

    // Generic action to perform when any collision happened
    collided() {

    }

    // When tried to move into another object
    collidedInto(actor: Actor) {
        this.collided();


    }

    // When another object tried to move into me
    collidedBy(actor: Actor) {
        this.collided();

    }

    cancelCurrentCommand() {
        this.currentCommand = null;
    }

    addCommand(command: Command) {
        this.commands.push(command);
        if (this.currentCommand === null) {
            //set as next action immediately
            this.currentCommand = this.popCommand();
            // When we add a command normally, set it up to execute immediately
            this.currentCommand.setNextActionIfEmpty();
        }
    }

    clearCommands() {
        this.commands = [];
        this.currentCommand = null;
        this.ticksUntilNextAction = null;
    }

    // When we interrupt with a new command, we shouldn't clear away the currentCommand
    //
    interruptWithCommand(command: Command) {
        // Backup the current ticks until next action
        var ticksUntilNextAction = this.ticksUntilNextAction;
        var ignoreExecutionUntilNextFire = this.currentCommand.ignoreExecutionUntilNextFire;

        // Wipe the current commands
        this.clearCommands();
        this.addCommand(command);

        // And restore
        this.currentCommand.ignoreExecutionUntilNextFire = ignoreExecutionUntilNextFire;
        this.ticksUntilNextAction = ticksUntilNextAction;
    }

    popCommand() {
        if (this.commands.length > 0) {
            var nextCommand = this.commands[0];
            this.commands.shift(); // pop off the next action from the stack
            return nextCommand;
        }
        else {
            return null;
        }
    }

    // On game timer tick
    tick() {

        if (!this.doesSubscribeToTicks) return;

        // Immediately decrease the ticks remaining for the next action
        if (this.ticksUntilNextAction !== null) {
            this.ticksUntilNextAction--;
        }

        // If we have a command that we're about to wait on, execute it now if preferred
        // If the current action needs to fire immediately and then wait, do so
        if (this.currentCommand !== null && this.currentCommand.currentAction !== null) {
            if (this.currentCommand.ignoreExecutionUntilNextFire === false && this.currentCommand.currentAction.executionType === ExecutionType.ExecuteAndThenWait) {
                this.currentCommand.execute();
                if (this.currentCommand !== null) {
                    this.currentCommand.ignoreExecutionUntilNextFire = true;
                }
            }
        }

        // If we can fire the next action that we've been waiting for, do so
        if (this.ticksUntilNextAction !== null && this.ticksUntilNextAction <= 0) {
            if (this.currentCommand !== null) {
                if (this.currentCommand.currentAction !== null) {

                    // If this is a late-fire action, then fire it now
                    if (this.currentCommand.currentAction.executionType === ExecutionType.WaitAndThenExecute) {
                        this.currentCommand.execute();
                    }
                    this.currentCommand.ignoreExecutionUntilNextFire = false;
                }

                // We're no longer waiting on anything
                this.ticksUntilNextAction = null;

                // Now that the action is done, check if we need to set the next one up
                var nextAction = this.currentCommand.currentAction;
                if (nextAction !== null) {
                    this.ticksUntilNextAction = nextAction.tickDuration;
                }
                else {
                    // Otherwise, clear away our current command to accept the future one
                    this.currentCommand = null;
                }
            }
        }

        // If we're not waiting on anything now, set up the next command
        if (this.currentCommand === null) {
            if (this.commands.length > 0) {
                this.currentCommand = this.popCommand();
                if (this.currentCommand !== null && this.currentCommand.currentAction !== null) {
                    this.ticksUntilNextAction = this.currentCommand.currentAction.tickDuration;
                }
            }
        }

        // If we're all out of things to do, set the status back to idle (if it even changed)
        if (this.ticksUntilNextAction === null) {
            this.status = ActorStatus.Idle;
        }

    }

    canSeePoint(point: Point, range: number) {
        // If they're within the view distance and aren't hidden behind anything
        return Geometry.IsPointInCircle(this.location, range, point) &&
            Geometry.PointCanSeePoint(this.location, point, this.layer);
    }

    canBeSeenByPoint(point: Point, range: number) {
        // Inverse of canSee from the other perspective
        return Geometry.IsPointInCircle(point, range, this.location) &&
            Geometry.PointCanSeePoint(point, this.location, this.layer);
    }

    canSeeActor(actor: Actor) {
        return this.canSeePoint(actor.location, this.viewRadius);
    }

    canBeSeenByActor(actor: Actor) {
        return this.canBeSeenByPoint(actor.location, actor.viewRadius);
    }

    obtainInventoryItem(inventoryItem: InventoryItem) {
        inventoryItem.holder = this;
        this.inventory.push(inventoryItem);
        this.game.log(this.name + ' obtained ' + inventoryItem.name);
    }

    destroy() {
        // Stop acting on game ticks after this goes away
        this.doesSubscribeToTicks = false;
    }
}
