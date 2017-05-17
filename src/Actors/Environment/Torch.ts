class Torch extends Actor implements EmitsLight {
    emitRadius: number = 10;
    emitColor: number = 0x000000; //orange
    emitIntensity: number = 1; // 1.0 is max


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
