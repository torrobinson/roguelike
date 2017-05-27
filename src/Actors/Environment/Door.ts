class Door extends Actor {
    tryToClose: boolean = false;
    doesSubscribeToTicks: boolean = true;
    defaultOpenTickDuration: number = 3;
    openTickDuration: number;

    constructor(game: Game, orientation: Orientation) {
        super(game);
        this.spritesets = Sprites.DoorSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = true;
        this.openTickDuration = this.defaultOpenTickDuration;

        this.status = ActorStatus.Closed;

        if (orientation === Orientation.Horizontal) {
            this.facing = Direction.Left;
        }
        else if (orientation === Orientation.Vertical) {
            this.facing = Direction.Down;
        }
    }

    tryOpen() {
        if (this.status === ActorStatus.Closed) {
            this.open();
        }
    }

    open() {
        this.tryToClose = false;
        this.status = ActorStatus.Open;
        var wallDecorLayer: Layer = this.game.world.getLayersOfType(LayerType.WallDecor).first();
        this.jumpToLayer(wallDecorLayer);
        this.blocksSight = false;
        this.openTickDuration = this.defaultOpenTickDuration;
    }

    close() {
        // Try to close
        this.tryToClose = true;
        this.tryClose();
    }

    // try close when the doorway is free and open
    tryClose() {
        var mainlayer: Layer = this.game.world.getLayersOfType(LayerType.Wall).first();
        if (mainlayer.getTile(this.location.x, this.location.y) === null) {
            this.status = ActorStatus.Closed;
            this.jumpToLayer(mainlayer);
            this.blocksSight = true;
            this.tryToClose = false;
        }
    }

    tick() {
        super.tick();

        // Every tick while open, count down
        if (this.status === ActorStatus.Open) {
            this.openTickDuration--;

            // And if we reached below 0, then close
            if (this.openTickDuration < 0) {
                this.close();
            }
        }

        // If we're waiting on a close, try every tick
        if (this.tryToClose) {
            this.tryClose();
        }
    }
}
