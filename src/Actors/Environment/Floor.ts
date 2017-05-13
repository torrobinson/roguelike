import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { Game } from 'src/Game'
import { FloorSprites } from 'src/Actors/Sprites/Environment/FloorSprites'

export class Floor extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = FloorSprites;
        this.fogStyle = Enums.FogStyle.Darken;
    }
}
