class Buff {
    owner: Actor = null;
    granter: any = null;
    maxUses: number = Infinity;
    uses: number = 0;
    namePart: string;
    color: number = ColorCode.Grey;

    constructor() {

    }

    // Basic Helpers
    applyTo(actor: Actor, granter = null) {
        actor.buffs.push(this);
        this.owner = actor;
        if(granter){
          this.granter = granter;
        }
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

    getUsesRemaining() {
        return this.maxUses - this.uses;
    }

    // Describes the state of the buff
    getDescription() {

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
