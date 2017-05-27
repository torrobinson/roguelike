class Chaser extends Actor {
    startingHealth: number = 2;
    health: number = this.startingHealth;
    name: string = 'Blob';
    xpBounty: number = 2;
    moveTickDuration: number = 2;
    viewRadius: number = 15;
    target: Actor = null;

    constructor(game: Game) {
        super(game);
        this.doesSubscribeToTicks = true;
        this.takesCommands = true;
        this.blocksSight = false; // it's short and we can see over it
        this.spritesets = Sprites.ChaserSprites();

        // Initialize level as the same as the player
        this.level = Battle.getLevelModifierForActor(game.player);
        this.xpBounty = 1 + this.level * 2;
    }

    collidedInto(actor: Actor) {
        // Call base Actor collision
        super.collidedInto(actor);

        if (actor instanceof Player) {
            this.attack(actor);
        }

        // If we hit something that wasn't our target, re-evaluate the path
        else if (this.target !== null && actor !== this.target) {
            this.setCourseFor(this.target);
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
            // They'll finish their current move to where the last saw yiy

        }

    }

    setCourseFor(actor: Actor) {
        this.target = actor;
        var command = new MoveTo(
            this,
            actor.location
        );
        if (this.currentCommand !== null) {
            // Retarget the player
            this.interruptWithCommand(command);
        }
        else {
            this.addCommand(command);
        }
    }
}
