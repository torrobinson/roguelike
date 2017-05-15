interface Renderer {
    canvas: any;
    width: number;
    height: number;
    game: Game;

    init(): void;
    drawFrame(world: World, centerPoint: Point): void;
}
