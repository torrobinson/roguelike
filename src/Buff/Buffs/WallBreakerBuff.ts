// <reference path="../Base/Buff.ts" />
class WallBreakerBuff extends Buff {
    maxUses: number = 10;
    namePart: string = 'Wall Breaking';

    getDescription() {
        return "Destroy the next " + this.getUsesRemaining() + ' walls you touch';
    }

    // The wall breaker buff causes walls the actor bumps into to be destroyed immediately
    onCollideBefore(bumped: Actor) {
        // If we hit a wall
        if (bumped instanceof Wall) {
            // And the wall isn't the border of the map
            //   (we dont want the player to try leave the map)
            if (
                bumped.location.x !== 0 &&
                bumped.location.x !== bumped.layer.width - 1 &&
                bumped.location.y !== 0 &&
                bumped.location.y !== bumped.layer.height - 1
            ) {
                bumped.die();
                this.used();
            }
        }
    }
}
