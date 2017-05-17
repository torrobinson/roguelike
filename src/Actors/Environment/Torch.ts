class Torch extends Actor implements EmitsLight {
    emitRadius: number = 10;
    emitColor: number = 0xFFA200; //orange
    emitIntensity: number = 1.0; // 1.0 is max


    constructor(game: Game) {
        super(game);
        this.spritesets = Sprites.TorchSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
        this.fullBright = true; // it's a torch, it cant be darkened
    }
}
