import { Game } from 'src/Game'
import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { StairsUpSprites } from 'src/Actors/Sprites/Environment/Special/StairsUpSprites'

export class StairsUp extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = StairsUpSprites;
        this.fogStyle = Enums.FogStyle.Hide;
        this.blocksSight = false;
    }
}
