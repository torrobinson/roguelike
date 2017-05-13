import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const StairsUpSprites = [
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Down,
        [
            new Sprite(
                'LadderBottomDown',
                '%'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
];
