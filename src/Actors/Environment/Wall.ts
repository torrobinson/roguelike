import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { Game } from 'src/Game'
import { WallSprites } from 'src/Actors/Sprites/Environment/WallSprites'

export class Wall extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = WallSprites;
        this.fogStyle = Enums.FogStyle.Darken;
    }
}
