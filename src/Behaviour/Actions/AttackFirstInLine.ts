class AttackFirstInLine extends Action {

    tickDuration: number;
    executionType: ExecutionType;
    targetTile: Point;

    constructor(command: Command, targetTile: Point, chargeTicks: number = 1) {
        super(command);
        this.tickDuration = chargeTicks;
        this.targetTile = targetTile;
        this.executionType = ExecutionType.WaitAndThenExecute;
    }
    execute() {
        super.execute();

        // Draw a line from me to the targetTile and damage whatever actor we hit first
        var start: Actor = this.getActor();
        var end = this.targetTile;

        var actorHit: Actor = null;
        // In in view range
        if(start.getDistanceFromPoint(end) <= start.viewRadius){

            if(Geometry.PointCanSeePoint(start.location, end, start.layer,
              (intermediaryActorHit) => {
                // If it can't see, but it did hit an intermediary actor
                actorHit = intermediaryActorHit;
              }
            )){
              // Can see and nothing obstructed
              actorHit = start.layer.getTile(end.x, end.y);
            }

        }

        if(actorHit !== null){
            // Damage the actor hit
            actorHit.attack(actorHit, start.getDamage());
        }
    }
}
