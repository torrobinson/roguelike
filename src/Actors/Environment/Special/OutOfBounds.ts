import { Game } from 'src/Game'
import { Actor } from 'src/Actors/Actor'
import { OutOfBoundsSprites } from 'src/Actors/Sprites/Environment/Special/OutOfBoundsSprites'
export namespace Environment.Special {
    export class OutOfBounds extends Actor {
        constructor(game: Game) {
            super(game);
            this.spritesets = OutOfBoundsSprites;
        }
    }
}
