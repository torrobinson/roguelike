// <reference path="../Base/Buff.ts" />
class PetrifiedDebuff extends Buff {
    maxUses: number = 20;
    namePart: string = 'Petrified';
    color: number = ColorCode.Purple;
    overridesExistingBehaviour: boolean = true;

    getDescription() {
        return "You cannot perform the next " + this.getUsesRemaining() + ' actions';
    }

    // After this buff is added, flip the actor to invisible
    onBuffEquippedAfter(user: Actor, buff: Buff) {
        if (buff === this) user.isStone = true;
    }

    // Right before we remove this buff, flip the actor to visible again
    onBuffUnequippedBefore(user: Actor, buff: Buff): boolean {
        if (buff === this) user.isStone = false;
        return false; // don't skip other normal behaiour
    }

    // Prevent movements
    onMovedBefore(): boolean {
        return true; // skip normal movement
    }

    // Prevent attacks
    onAttackBefore(attacked: Actor): boolean {
        return true; // skip normal attack attempts
    }

    // Every tick while on, count as a use as it goes away
    tickedAfter() {
        this.used();
    }

}
