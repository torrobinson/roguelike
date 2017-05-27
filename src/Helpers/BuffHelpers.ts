class BuffHelpers {

    // Attack
    static handleOnAttackBuffsBefore(actor: Actor, attacked: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onAttackBefore(attacked); });
        return skipExistingBehaviour;
    }
    static handleOnAttackBuffsAfter(actor: Actor, attacked: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackAfter(attacked) });
    }

    // Attacked By
    static handleonAttackedBuffsBefore(actor: Actor, attackedBy: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onAttackedByBefore(attackedBy); });
        return skipExistingBehaviour;
    }
    static handleonAttackedBuffsAfter(actor: Actor, attackedBy: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackedByAfter(attackedBy) });
    }


    // Moved
    static handleonMovedBuffsBefore(actor: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onMovedBefore(); });
        return skipExistingBehaviour;
    }
    static handleonMovedBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.onMovedAfter() });
    }


    // Collided
    static handleonCollideBuffsBefore(actor: Actor, bumped: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onCollideBefore(bumped); });
        return skipExistingBehaviour;
    }
    static handleonCollideBuffsAfter(actor: Actor, bumped: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollideAfter(bumped) });
    }

    // Collided Into
    static handleonCollidedIntoBuffsBefore(actor: Actor, bumper: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onCollidedIntoByBefore(bumper); });
        return skipExistingBehaviour;
    }
    static handleonCollidedIntoBuffsAfer(actor: Actor, bumper: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollidedIntoByAfter(bumper) });
    }

    // Ticked
    static handleTickBuffsBefore(actor: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.tickedBefore(); });
        return skipExistingBehaviour;
    }
    static handleTickBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.tickedAfter() });
    }

    // Equipped Buffs
    static handleOnBuffEquippedBefore(actor: Actor, buff: Buff) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onBuffEquippedBefore(actor, buff); });
        return skipExistingBehaviour;
    }
    static handleOnBuffEquippedAfter(actor: Actor, buff: Buff) {
        actor.buffs.forEach((buff) => { buff.onBuffEquippedAfter(actor, buff) });
    }
    static handleOnBuffUnequippedBefore(actor: Actor, buff: Buff) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { skipExistingBehaviour = buff.onBuffUnequippedBefore(actor, buff); });
        return skipExistingBehaviour;
    }
    static handleOnBuffUnequippedAfter(actor: Actor, buff: Buff) {
        actor.buffs.forEach((buff) => { buff.onBuffUnequippedAfter(actor, buff) });
    }

}
