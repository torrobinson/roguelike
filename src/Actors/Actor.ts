class Actor {
    // References
    game: Game;
    world: World = null;
    layer: Layer = null;

    // Location
    facing: Direction = Direction.Down;
    location: Point = null;
    home: Point;

    // Behaviour
    commands: Command[] = [];
    currentCommand: Command = null;
    ticksUntilNextAction: number = null;
    doesSubscribeToTicks: boolean = false;
    takesCommands: boolean = false;
    moveTickDuration: number = 1;
    movedLastTurn: boolean = false;

    // General attributes
    name: string = '';
    xpBounty: number = 0;
    status: ActorStatus = ActorStatus.Idle;
    gold: number = 0;
    viewRadius: number = 5;
    inventory: InventoryItem[] = [];
    blocksSight: boolean = true;
    startingHealth: number = undefined;
    health: number = this.startingHealth;
    attackRange: number = 1;

    // Experience Points
    level: number;
    xpNeeded: number = 0;
    currentLevelXP: number = 0;

    // Sprites
    spritesets: SpriteSet[] = null;
    restartSpriteNextFrame: boolean = false;
    fogged: boolean = true;
    fogStyle: FogStyle = FogStyle.Hide;
    fullBright: boolean = false;
    lastSprite: Sprite;
    isVisible: boolean = true;
    isFrozen: boolean = false;
    isStone: boolean = false;

    // Equipment
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
                var spriteSet: SpriteSet = this.spritesets.filter(
                    function(spriteset) {
                        return spriteset.status === this.status && spriteset.direction === this.facing
                    }, this).first();
                var sprite: Sprite = null;
                if (spriteSet !== null) {
                    sprite = spriteSet.getSprite(this.restartSpriteNextFrame);
                }
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

    getDamage(): number {
        // Get total default + weapon attack damage together
        return this.defaultAttackPower() + this.getWeaponOnlyDamage();
    }

    heal(healAmount: number) {
        this.health += healAmount;
        if (this.health > this.maxHealth()) {
            this.health = this.maxHealth();
        }

        this.game.renderer.renderHealEffect(this, healAmount);
    }

    getWeaponOnlyDamage(): number {
        var damage = 0;
        var weapon: Weapon = this.getWeapon();
        if (weapon) {
            damage += weapon.attackPower;     // add more if weapon equipped
        }
        return damage;
    }

    getInventoryOfType(type: any): InventoryItem[] {
        return this.inventory.where((inv) => { return inv instanceof type });
    }

    getDistanceFrom(otherActor: Actor): number {
        return this.getDistanceFromPoint(otherActor.location);
    }

    getDistanceFromPoint(point: Point): number {
        return Math.hypot(point.x - this.location.x, point.y - this.location.y);
    }

    canAttack(otherActor: Actor): boolean {
        if (this.getDistanceFrom(otherActor) <= this.attackRange) {
            return true;
        }

        return false;
    }

    attack(otherActor: Actor, damage?: number) {
        if (BuffHelpers.handleOnAttackBuffsBefore(this, otherActor)) { return; }

        // If not overridden, calculate damage
        if (!damage) {
            damage = otherActor.getDamage();
        }

        // Deal the damage
        otherActor.attackedBy(this, damage);

        BuffHelpers.handleOnAttackBuffsAfter(this, otherActor);
    }

    attackedBy(attacker: Actor, damage: number) {
        if (BuffHelpers.handleonAttackedBuffsBefore(this, attacker)) { return; }
        this.health -= damage;
        // Did we die?
        if (this.health <= 0) {
            // Notify the attacker
            attacker.madeKill(this);

            // And then die
            this.die();
        }
        this.game.renderer.renderDamageEffect(this, damage);
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

    addBuff(buff: Buff, granter: any = null) {
        if (BuffHelpers.handleOnBuffEquippedBefore(this, buff)) { return; }

        buff.applyTo(this, granter);

        BuffHelpers.handleOnBuffEquippedAfter(this, buff);
    }

    removeBuff(buff: Buff) {
        if (BuffHelpers.handleOnBuffUnequippedBefore(this, buff)) { return; }

        this.buffs.remove(buff);

        BuffHelpers.handleOnBuffUnequippedAfter(this, buff);
    }

    removeBuffByType(type: any) {
        var buffsToRemove: Buff[] = this.buffs.where((buff) => {
            return buff instanceof type;
        });
        for (let b = 0; b < buffsToRemove.length; b++) {
            this.buffs.remove(buffsToRemove[b]);
        }
    }

    jumpToLayer(layer: Layer): void {
        World.MoveActorToLayer(this, layer);
    }

    move(direction: Direction) {
        if (BuffHelpers.handleonMovedBuffsBefore(this)) { return; }

        this.facing = direction;
        var offsetToMove = Movement.DirectionToOffset(direction);
        if (this.layer !== null) {
            var moveTo = Movement.AddPoints(this.location, offsetToMove);
            var result = Movement.TryMove(this, this.layer, moveTo);
            if (result) {
                // Moved
                this.movedLastTurn = true;
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
    collided(actorInvolved: Actor) {

    }

    // When tried to move into another object
    collidedInto(actor: Actor) {
        if (BuffHelpers.handleonCollideBuffsBefore(this, actor)) { return; }

        // If anything hits into a wall, open it
        if (actor instanceof Door) {
            (<Door>actor).tryOpen();
        }

        this.collided(actor);
        BuffHelpers.handleonCollideBuffsAfter(this, actor);
    }

    // When another object tried to move into me
    collidedBy(actor: Actor) {
        if (BuffHelpers.handleonCollidedIntoBuffsBefore(this, actor)) { return; }
        this.collided(actor);
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
        if (this.currentCommand !== null) {
            // Retarget the player
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
        else {
            // If we're already out of commands, just add it like normal
            this.addCommand(command);
        }
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
        if (BuffHelpers.handleTickBuffsBefore(this)) { return; }

        if (!this.doesSubscribeToTicks) return;
        if (!this.takesCommands) return;

        this.movedLastTurn = false;

        if (this.currentCommand !== null && this.currentCommand.currentAction !== null && this.ticksUntilNextAction === null) {
            this.ticksUntilNextAction = this.currentCommand.currentAction.tickDuration;
        }

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
        return actor.isVisible && this.canSeePoint(actor.location, this.viewRadius);
    }

    canBeSeenByActor(actor: Actor) {
        return this.isVisible && this.canBeSeenByPoint(actor.location, actor.viewRadius);
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

    getAdjacentActor(direction: Direction): Actor {
        var offset = Movement.DirectionToOffset(direction);
        var location = this.location.offsetBy(offset.x, offset.y);
        return this.layer.getTile(location.x, location.y);
    }

    destroy() {
        // Stop acting on game ticks after this goes away
        this.doesSubscribeToTicks = false;
    }
}
