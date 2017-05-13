import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const ChestSprites = [

    new SpriteSet(
        Enums.ActorStatus.Closed,
        Enums.Direction.Down,
        [
            new Sprite(
                'ChestClosedDown',
                ' '
            )
        ],
        Enums.AnimationLoopStyle.Static,
        0
    ),

    new SpriteSet(
        Enums.ActorStatus.Open,
        Enums.Direction.Down,
        [
            new Sprite(
                'ChestOpenDown',
                ' '
            )
        ],
        Enums.AnimationLoopStyle.Static,
        0
    ),

];
