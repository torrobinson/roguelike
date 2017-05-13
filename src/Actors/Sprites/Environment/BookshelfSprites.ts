import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const BookshelfSprites =
    [
        new SpriteSet(
            Enums.ActorStatus.Idle,
            Enums.Direction.Down,
            [
                new Sprite(
                    'BookshelfDown',
                    'B'
                )
            ],
            Enums.AnimationLoopStyle.Static
        ),

    ];
