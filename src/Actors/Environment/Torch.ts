class Torch extends Actor implements EmitsLight {
    emitRadius: number = 8;
    emitColor: number = LightColorCode.White;
    emitIntensity: number = 1;


    constructor(game: Game, color?: number) {
        super(game);

        if (color) {
            this.emitColor = color;
        }

        this.spritesets = Sprites.TorchSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
        this.fullBright = true; // it's a torch, it cant be darkened
    }
}
