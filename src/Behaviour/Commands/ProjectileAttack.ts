class ProjectileAttack extends Command {
    constructor(actor: Actor, remoteActor: Actor, chargeUpDuration: number = 1) {
        super(actor);

        this.addAction(
            new AttackFirstInLine(
                this,
                remoteActor.location,
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
