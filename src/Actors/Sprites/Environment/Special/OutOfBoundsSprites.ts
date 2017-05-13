import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const OutOfBoundsSprites = [
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Down,
        [
            new Sprite(
                'WallDarkDown',
                ' '
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
];
