import { ChaserSprites } from 'src/Actors/Sprites/Characters/ChaserSprites'
import { Actor } from 'src/Actors/Actor'
import { Player } from 'src/Actors/Character/Player'
import { MoveTo } from 'src/Actors/Behaviour/Commands/MoveTo'
import { Game } from 'src/Game'

export class Chaser extends Actor {

    constructor(game: Game) {
        super(game);
        this.doesSubscribeToTicks = true;

        this.moveTickDuration = 2;
        this.startingHealth = 1;
        this.viewRadius = 15;
        this.blocksSight = false; // it's short and we can see over it
        this.name = 'Blob';

        this.spritesets = ChaserSprites;
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
