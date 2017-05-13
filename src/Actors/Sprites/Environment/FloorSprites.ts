import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const FloorSprites =
    [
        new SpriteSet(
            Enums.ActorStatus.Idle,
            Enums.Direction.Down,
            [
                new Sprite(
                    'Cobblestone4Down',
                    '.'
                )
            ],
            Enums.AnimationLoopStyle.Static
        ),

    ];
