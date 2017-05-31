class RadialAttack extends Action {

    tickDuration: number;
    range: number;
    executionType: ExecutionType;

    constructor(command: Command, range: number, chargeTicks: number) {
        super(command);
        this.range = range;
        this.tickDuration = chargeTicks;
        this.executionType = ExecutionType.WaitAndThenExecute;
    }
    execute() {
        super.execute();
        var me = this.getActor();

        // Look for all surrounding valid points by the actor attacking
        var affectedPoints: Point[] = Geometry.GetPointsInCircle(
          me.location,
          this.range,
          me.layer
        );

        // For each point, if there's an actor there, damage them
        for(let p=0; p<affectedPoints.length; p++){
          var actorAtPoint: Actor = me.layer.getTile(affectedPoints[p].x, affectedPoints[p].y);
          if(actorAtPoint !== null){
            me.attack(actorAtPoint);
          }
        }
    }
}
