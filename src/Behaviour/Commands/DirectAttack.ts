class DirectAttack extends Command {
    constructor(actor: Actor, chargeUpDuration: number = 1) {
        super(actor);

        this.addAction(
            new AttackFacingTile(
                this,
                chargeUpDuration
            )
        );
    }

    execute() {
        super.execute();

        // Set status based on actions happening now
        this.actor.status = ActorStatus.Attacking;
    }
}
