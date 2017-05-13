import { Game } from 'src/Game'
import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { StairsDownSprites } from 'src/Actors/Sprites/Environment/Special/StairsDownSprites'

export class StairsDown extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = StairsDownSprites;
        this.fogStyle = Enums.FogStyle.Hide;
        this.blocksSight = false;
    }
}
