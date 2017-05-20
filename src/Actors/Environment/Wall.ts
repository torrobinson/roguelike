class Wall extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.WallSprites();
        this.fogStyle = FogStyle.Darken;
    }

    die() {
        // Before a wall is removed from the world, ensure there's a floor piece under it
        var floorLayer = this.game.world.getLayersOfType(LayerType.Floor).first();
        if (floorLayer.getTile(this.location.x, this.location.y) === null) {
            floorLayer.placeActor(
                new Floor(this.game),
                this.location
            );
        }
        super.die();
    }
}
