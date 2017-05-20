// <reference path="../Base/Buff.ts" />
class WallBreakerBuff extends Buff {
    maxUses: number = 5;

    getDescription() {
        return "Destroy the next " + this.getUsesRemaining() + ' walls you touch';
    }

    // The wall breaker buff causes things the actor bumps into to be destroyed immediately
    onCollideBefore(bumped: Actor) {
        if (bumped instanceof Wall) {
            bumped.die();
            this.used();
        }
    }
}
