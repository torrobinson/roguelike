class Buff {
    owner: Actor = null;
    maxUses: number = Infinity;
    uses: number = 0;

    constructor() {

    }

    // Apply/remove helpers
    applyTo(actor: Actor) {
        actor.buffs.push(this);
        this.owner = actor;
    }

    remove() {
        this.owner.buffs.remove(this);
        this.owner = null;
    }

    used() {
        this.uses++;
        if (this.uses >= this.maxUses) {
            this.remove();
        }
    }

    // Event handlers
    onAttackBefore(attacked: Actor) {

    }
    onAttackAfter(attacked: Actor) {

    }

    onAttackedByBefore(attackedBy: Actor) {

    }
    onAttackedByAfter(attackedBy: Actor) {

    }

    onMovedBefore() {

    }
    onMovedAfter() {

    }

    onCollideBefore(bumped: Actor) {

    }
    onCollideAfter(bumped: Actor) {

    }


    onCollidedIntoByBefore(bumper: Actor) {

    }
    onCollidedIntoByAfter(bumper: Actor) {

    }

    tickedBefore() {

    }
    tickedAfter() {

    }

}