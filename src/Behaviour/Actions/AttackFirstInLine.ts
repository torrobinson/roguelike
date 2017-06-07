class AttackFirstInLine extends Action {

    tickDuration: number;
    executionType: ExecutionType;
    targetTile: Point;
    weaponUsed: Projectile;

    constructor(command: Command, targetTile: Point, weaponUsed: Projectile, chargeTicks: number = 1) {
        super(command);
        this.tickDuration = chargeTicks;
        this.targetTile = targetTile;
        this.weaponUsed = weaponUsed;
        this.executionType = ExecutionType.WaitAndThenExecute;
    }
    execute() {
        super.execute();

        // Draw a line from me to the targetTile and damage whatever actor we hit first
        var start: Actor = this.getActor();
        var end = this.targetTile;

        var actorHit: Actor = null;
        // In in view range
        if (start.getDistanceFromPoint(end) <= start.viewRadius) {

            if (Geometry.PointCanSeePoint(start.location, end, start.layer,
                (intermediaryActorHit) => {
                    // If it can't see, but it did hit an intermediary actor
                    actorHit = intermediaryActorHit;
                }
            )) {
                // Can see and nothing obstructed
                actorHit = start.layer.getTile(end.x, end.y);
            }

        }

        // We have an actor to attempt the shot on
        if (actorHit !== null) {

            // First consume the arrow no matter whar
            var ammoToUse = this.getActor().getInventoryOfType(this.weaponUsed.ammoType).first();
            this.getActor().inventory.remove(ammoToUse);

            // Roll to see whether it was a success or not
            // We don't have to use the base game seed here because we want gameplay to vary
            var random = new Random(Date.now());
            if (random.wasLuckyPercent(this.weaponUsed.successRatePercent)) {
                // If they made the shot, damage the target
                // Damage the actor hit
                actorHit.attack(actorHit, start.getDamage());
            }
            else {
                // They missed, so drop it nearby as the worlditem
                var layer: Layer = start.layer
                var emptySpaceToDropAt: Point = Geometry.GetNearestFreePointTo(end, layer, 10);
                layer.setTile(
                    emptySpaceToDropAt.x,
                    emptySpaceToDropAt.y,
                    new DroppedArrow(
                        start.game,
                        start.game.random,
                    )
                );

                // Display a 'missed' message
                start.game.renderer.renderMessageAboveActor(actorHit, 'missed', ColorCode.Red);

            }
        }
    }
}
