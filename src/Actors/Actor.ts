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
    xpBounty: number = 0;
    status: ActorStatus = ActorStatus.Idle;
    viewRadius: number = 5;
    inventory: InventoryItem[] = [];
    fogged: boolean = true;
    fogStyle: FogStyle = FogStyle.Hide;
    blocksSight: boolean = true;
    restartSpriteNextFrame: boolean = false;
    startingHealth: number = undefined;
    health: number = this.startingHealth;
    world: World = null;
    fullBright: boolean = false;
    lastSprite: Sprite;
    level: number;
    xpNeeded: number = 0;
    currentLevelXP: number = 0;

    equippedHead: Armor = null;
    equippedTorso: Armor = null;
    equippedLegs: Armor = null;
    equippedHands: Armor = null;
    equippedFeet: Armor = null;
    equippedWeapon: Weapon = null;

    buffs: Buff[] = [];

    constructor(game: Game) {
        // Actors must be born with awareness of the game they are in
        this.game = game;
    }

    getSprite() {
        if (this.game.state === GameState.Playing) {
            if (this.spritesets !== null) {
                var sprite = this.spritesets.filter(
                    function(spriteset) {
                        return spriteset.status === this.status && spriteset.direction === this.facing
                    }, this).first().getSprite(this.restartSpriteNextFrame);
                this.restartSpriteNextFrame = false;
                this.lastSprite = sprite;
                return sprite;
            }
            else {
                return null;
            }
        }
        else {
            return this.lastSprite;
        }
    }

    isMoving() {
        return this.status === ActorStatus.Moving;
    }

    maxHealth() {
        return this.startingHealth + this.getMaxHealthBuff();
    }

    getMaxHealthBuff(): number {
        return this.getArmor().select((armor) => { return armor.maxHealthBuff }).sum();
    }

    getArmor(): Armor[] {
        return []
            .concat(this.equippedHead)
            .concat(this.equippedTorso)
            .concat(this.equippedLegs)
            .concat(this.equippedHands)
            .concat(this.equippedFeet)
            .whereNotNull();
    }
    getWeapon(): Weapon {
        return this.equippedWeapon;
    }

    getDamage() : number {
      var damage = this.defaultAttackPower(); // default
      var weapon: Weapon = this.getWeapon();
      if (weapon) {
          damage += weapon.attackPower;     // add more if weapon equipped
      }

      return damage;
    }

    getInventoryOfType(type: any): InventoryItem[] {
        return this.inventory.where((inv) => { return inv instanceof type });
    }

    attack(otherActor: Actor) {
        BuffHelpers.handleOnAttackBuffsBefore(this, otherActor);

        var damage = otherActor.getDamage();

        // Deal the damage
        otherActor.attackedBy(this, damage);

        BuffHelpers.handleOnAttackBuffsAfter(this, otherActor);
    }

    attackedBy(attacker: Actor, damage: number) {
        BuffHelpers.handleonAttackedBuffsBefore(this, attacker);
        this.health -= damage;
        // Did we die?
        if (this.health <= 0) {
            // Notify the attacker
            attacker.madeKill(this);

            // And then die
            this.die();
        }
        BuffHelpers.handleonAttackedBuffsAfter(this, attacker);
    }

    defaultAttackPower(): number {
        return 1 + Math.floor(this.level);
    }

    madeKill(killedActor: Actor) {

    }

    die() {
        this.layer.setTile(this.location.x, this.location.y, null);
        this.destroy();
    }

    addBuff(buff: Buff) {
        buff.applyTo(this);
    }

    removeBuff(buff: Buff) {
        this.buffs.remove(buff);
    }

    removeBuffByType(type: any) {
        var buffsToRemove: Buff[] = this.buffs.where((buff) => {
            return buff instanceof type;
        });
        for (let b = 0; b < buffsToRemove.length; b++) {
            this.buffs.remove(buffsToRemove[b]);
        }
    }

    move(direction: Direction) {
        BuffHelpers.handleonMovedBuffsBefore(this);

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

        BuffHelpers.handleonMovedBuffsAfter(this);
    }

    // Generic action to perform when any collision happened
    collided() {

    }

    // When tried to move into another object
    collidedInto(actor: Actor) {
        BuffHelpers.handleonCollideBuffsBefore(this, actor);
        this.collided();
        BuffHelpers.handleonCollideBuffsAfter(this, actor);
    }

    // When another object tried to move into me
    collidedBy(actor: Actor) {
        BuffHelpers.handleonCollidedIntoBuffsBefore(this, actor);
        this.collided();
        BuffHelpers.handleonCollidedIntoBuffsAfer(this, actor);

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
        BuffHelpers.handleTickBuffsBefore(this);

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


        BuffHelpers.handleTickBuffsAfter(this);
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

        this.game.log(
            new LogMessage(
                this.name + ' obtained ' + inventoryItem.getName(),
                LogMessageType.ObtainedItem
            )
        );

    }

    destroy() {
        // Stop acting on game ticks after this goes away
        this.doesSubscribeToTicks = false;
    }
}
