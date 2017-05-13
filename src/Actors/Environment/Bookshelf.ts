import { Actor } from 'src/Actors/Actor'
import { Enums } from 'src/Helpers/Enums'
import { Game } from 'src/Game'
import { BookshelfSprites } from 'src/Actors/Sprites/Environment/BookshelfSprites'

export class Bookshelf extends Actor {
    constructor(game: Game) {
        super(game);
        this.spritesets = BookshelfSprites;
        this.fogStyle = Enums.FogStyle.Darken;
        this.blocksSight = false;
    }
}
