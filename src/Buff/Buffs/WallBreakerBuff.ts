// <reference path="../Base/Buff.ts" />
class WallBreakerBuff extends Buff {
    maxUses: number = 5;

    constructor() {
        super();
    }

    // The wall breaker buff causes things the actor bumps into to be destroyed immediately
    onCollideBefore(bumped: Actor) {
        super.onCollideBefore(bumped);
        if (bumped instanceof Wall) {
            bumped.die();
            this.used();
        }
    }
}
