class BuffHelpers {

    // Attack
    static handleOnAttackBuffsBefore(actor: Actor, attacked: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackBefore(attacked) });
    }
    static handleOnAttackBuffsAfter(actor: Actor, attacked: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackAfter(attacked) });
    }

    // Attacked By
    static handleonAttackedBuffsBefore(actor: Actor, attackedBy: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackedByBefore(attackedBy) });
    }
    static handleonAttackedBuffsAfter(actor: Actor, attackedBy: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackedByAfter(attackedBy) });
    }


    // Moved
    static handleonMovedBuffsBefore(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.onMovedBefore() });
    }
    static handleonMovedBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.onMovedAfter() });
    }


    // Collided
    static handleonCollideBuffsBefore(actor: Actor, bumped: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollideBefore(bumped) });
    }
    static handleonCollideBuffsAfter(actor: Actor, bumped: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollideAfter(bumped) });
    }

    // Collided Into
    static handleonCollidedIntoBuffsBefore(actor: Actor, bumper: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollidedIntoByBefore(bumper) });
    }
    static handleonCollidedIntoBuffsAfer(actor: Actor, bumper: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollidedIntoByAfter(bumper) });
    }

    // Ticked
    static handleTickBuffsBefore(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.tickedBefore() });
    }
    static handleTickBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.tickedAfter() });
    }
}
