class Chaser extends Actor {
      startingHealth: number = 1;
      health: number = this.startingHealth;
        name: string = 'Blob';
        moveTickDuration: number = 2;
        viewRadius: number = 15;
    constructor(game: Game) {
        super(game);
        this.doesSubscribeToTicks = true;
        this.blocksSight = false; // it's short and we can see over it
        this.spritesets = Sprites.ChaserSprites();
    }

    collidedInto(actor: Actor) {
        // Call base Actor collision
        super.collidedInto(actor);

        if (actor instanceof Player) {
            this.attack(actor, this.defaultAttackPower);
        }
    }

    tick() {
        super.tick();

        var player = this.game.player;
        var self = this;

        // If we can see the player, then target them
        if (self.canSeeActor(player)) {
            var command = new MoveTo(
                self,
                player.location
            );
            if (self.currentCommand !== null) {
                // Retarget the player
                self.interruptWithCommand(command);
            }
            else {
                self.addCommand(command);
            }
        }
        else {
            // Can't see the player.
            // They'll finish their current move to where the last saw yiy

        }

    }
}
