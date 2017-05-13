import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { Game } from 'src/Game'
import { CarpetSprites } from 'src/Actors/Sprites/Environment/CarpetSprites'

export class Carpet extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = CarpetSprites;
        this.fogStyle = Enums.FogStyle.Darken;
    }
}
