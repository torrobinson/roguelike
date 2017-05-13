import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { Game } from 'src/Game'
import { PillarSprites } from 'src/Actors/Sprites/Environment/PillarSprites'

export class Pillar extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = PillarSprites;
        this.fogStyle = Enums.FogStyle.Darken;
        this.blocksSight = false;
    }
}
