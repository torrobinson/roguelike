class ProjectileAttack extends Command {
    constructor(actor: Actor, weaponUsed: Projectile, remoteActor: Actor, chargeUpDuration: number = 1) {
        super(actor);

        this.addAction(
            new AttackFirstInLine(
                this,
                remoteActor.location,
                weaponUsed,
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
