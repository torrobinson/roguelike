import { Game } from 'src/Game'
import { World } from 'src/World'
import { Point } from 'src/Point'

export interface Renderer {
    canvas: any;
    width: number;
    height: number;
    game: Game;

    init(): void;
    drawFrame(world: World, centerPoint: Point): void;
}
