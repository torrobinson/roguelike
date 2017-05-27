class Buff {
    owner: Actor = null;
    granter: any = null;
    maxUses: number = Infinity;
    uses: number = 0;
    namePart: string;
    color: number = ColorCode.Grey;
    overridesExistingBehaviour: boolean = false;

    constructor() {

    }

    // Basic Helpers
    applyTo(actor: Actor, granter = null): void {
        actor.buffs.push(this);
        this.owner = actor;
        if (granter) {
            this.granter = granter;
        }
    }

    remove(): void {
        this.owner.removeBuff(this);
        this.owner = null;
    }

    used(): void {
        this.uses++;
        if (this.uses >= this.maxUses) {
            this.remove();
        }
    }

    getUsesRemaining(): number {
        return this.maxUses - this.uses;
    }

    // Describes the state of the buff
    getDescription(): string {
        return '';
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

    onBuffEquippedBefore(user: Actor, buff: Buff) {

    }
    onBuffEquippedAfter(user: Actor, buff: Buff) {

    }
    onBuffUnequippedBefore(user: Actor, buff: Buff) {

    }
    onBuffUnequippedAfter(user: Actor, buff: Buff) {

    }

}
