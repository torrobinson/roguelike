class Chaser extends Actor {
    // Movement/pathing helpers
    target: Actor = null;
    targetKnownLocation: Point = null;
    stuckFor: number = 0;
    abandonPathAfterStuckFor: number = 2;

    constructor(game: Game) {
        super(game);
        this.doesSubscribeToTicks = true;
        this.takesCommands = true;
    }

    collidedInto(actor: Actor) {
        // Call base Actor collision
        super.collidedInto(actor);

        if (actor instanceof Player) {
            this.attack(actor);
        }

        // If we hit something that wasn't our target, re-evaluate the path
        else if (this.target !== null && actor !== this.target && this.targetKnownLocation !== null) {
            this.setCourseForPoint(this.targetKnownLocation);
        }
    }

    defaultAttackPower(): number {
        return 1 + Math.floor(this.level * 0.5);
    }

    tick() {
        super.tick();

        var player = this.game.player;

        // If we can see the player, then target them
        if (this.canSeeActor(player)) {
            this.setCourseFor(player);
        }
        else {
            // Can't see the player.
            // They'll finish their current moves here to where the last saw you


            // If they ran out of commands, then go back 'home' and forget who we were chasing
            if (this.currentCommand === null && this.home !== null && !this.location.equals(this.home)) {
                this.setCourseForHome();
            }

        }

    }

    move(direction: Direction) {
        super.move(direction);

        // After every movement attempt, check if we actually moved
        if (this.movedLastTurn) {
            this.stuckFor = 0;
        }
        else if (this.target != null || this.currentCommand instanceof MoveTo) {
            // If we didnt and we meant to (had a target or have a move command), count up
            this.stuckFor++;

            // And if we were stuck for our maximum allowable turns, then abandon the target and try return home
            if (this.stuckFor >= this.abandonPathAfterStuckFor) {
                this.stuckFor = 0;
                this.setCourseForHome();
            }
        }

    }

    setCourseFor(actor: Actor) {
        this.target = actor;
        this.targetKnownLocation = actor.location.clone();
        this.setCourseForPoint(this.targetKnownLocation);
    }

    setCourseForPoint(point: Point) {
        var command = new MoveTo(
            this,
            point
        );
        this.interruptWithCommand(command);
    }

    setCourseForHome() {
        this.forgetAboutTarget();
        this.interruptWithCommand(
            new MoveTo(
                this,
                this.home,
                true
            )
        );
    }

    forgetAboutTarget() {
        this.target = null;
        this.targetKnownLocation = null;
    }
}
