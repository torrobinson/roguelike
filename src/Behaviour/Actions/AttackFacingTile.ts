class AttackFacingTile extends Action {

    tickDuration: number;
    executionType: ExecutionType;
    direction: Direction;

    constructor(command: Command, chargeTicks: number = 1) {
        super(command);
        this.tickDuration = chargeTicks;
        this.executionType = ExecutionType.WaitAndThenExecute;
    }
    execute() {
        super.execute();
        var me: Actor = this.getActor();
        this.direction = me.facing;

        var affectedPoint: Point = Movement.AddPoints(
            me.location,
            Movement.DirectionToOffset(
                this.direction
            )
        );

        var actorAtPoint: Actor = me.layer.getTile(affectedPoint.x, affectedPoint.y);
        if (actorAtPoint !== null) {
            me.attack(actorAtPoint);
        }
    }
}
