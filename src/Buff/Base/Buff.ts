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
    // BEFORE handlers should return TRUE or FALSE for if they should override and cancell out the normally
    //     proceeding behaviour
    onAttackBefore(attacked: Actor): boolean {
        return false;
    }
    onAttackAfter(attacked: Actor) {

    }

    onAttackedByBefore(attackedBy: Actor): boolean {
        return false;
    }
    onAttackedByAfter(attackedBy: Actor) {

    }

    onMovedBefore(): boolean {
        return false;
    }
    onMovedAfter() {

    }

    onCollideBefore(bumped: Actor): boolean {
        return false;
    }
    onCollideAfter(bumped: Actor) {

    }


    onCollidedIntoByBefore(bumper: Actor): boolean {
        return false;
    }
    onCollidedIntoByAfter(bumper: Actor) {

    }

    tickedBefore(): boolean {
        return false;
    }
    tickedAfter() {

    }

    onBuffEquippedBefore(user: Actor, buff: Buff): boolean {
        return false;
    }
    onBuffEquippedAfter(user: Actor, buff: Buff) {

    }

    onBuffUnequippedBefore(user: Actor, buff: Buff): boolean {
        return false;
    }
    onBuffUnequippedAfter(user: Actor, buff: Buff) {

    }

}
