class BuffHelpers {

    // Attack
    static handleOnAttackBuffsBefore(actor: Actor, attacked: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onAttackBefore(attacked); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleOnAttackBuffsAfter(actor: Actor, attacked: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackAfter(attacked) });
    }

    // Attacked By
    static handleonAttackedBuffsBefore(actor: Actor, attackedBy: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onAttackedByBefore(attackedBy); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleonAttackedBuffsAfter(actor: Actor, attackedBy: Actor) {
        actor.buffs.forEach((buff) => { buff.onAttackedByAfter(attackedBy) });
    }


    // Moved
    static handleonMovedBuffsBefore(actor: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onMovedBefore(); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleonMovedBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.onMovedAfter() });
    }


    // Collided
    static handleonCollideBuffsBefore(actor: Actor, bumped: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onCollideBefore(bumped); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleonCollideBuffsAfter(actor: Actor, bumped: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollideAfter(bumped) });
    }

    // Collided Into
    static handleonCollidedIntoBuffsBefore(actor: Actor, bumper: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onCollidedIntoByBefore(bumper); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleonCollidedIntoBuffsAfer(actor: Actor, bumper: Actor) {
        actor.buffs.forEach((buff) => { buff.onCollidedIntoByAfter(bumper) });
    }

    // Ticked
    static handleTickBuffsBefore(actor: Actor) {
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.tickedBefore(); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleTickBuffsAfter(actor: Actor) {
        actor.buffs.forEach((buff) => { buff.tickedAfter() });
    }

    // Equipped Buffs
    static handleOnBuffEquippedBefore(actor: Actor, buff: Buff){
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onBuffEquippedBefore(actor, buff); skipExistingBehaviour = buff.overridesExistingBehaviour; });
        return skipExistingBehaviour;
    }
    static handleOnBuffEquippedAfter(actor: Actor, buff: Buff){
        actor.buffs.forEach((buff) => { buff.onBuffEquippedAfter(actor, buff)});
    }
    static handleOnBuffUnequippedBefore(actor: Actor, buff: Buff){
        var skipExistingBehaviour = false;
        actor.buffs.forEach((buff) => { buff.onBuffUnequippedBefore(actor, buff); skipExistingBehaviour = buff.overridesExistingBehaviour;  });
        return skipExistingBehaviour;
    }
    static handleOnBuffUnequippedAfter(actor: Actor, buff: Buff){
        actor.buffs.forEach((buff) => { buff.onBuffUnequippedAfter(actor, buff)});
    }

}
