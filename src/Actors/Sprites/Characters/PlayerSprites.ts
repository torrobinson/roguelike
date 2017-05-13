import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const PlayerSprites = [

    // Idle
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Up,
        [
            new Sprite(
                'PlayerUp_1',
                '↑'
            ),
            new Sprite(
                'PlayerUp_2',
                '↑'
            ),
            new Sprite(
                'PlayerUp_3',
                '↑'
            ),
            new Sprite(
                'PlayerUp_2',
                '↑'
            ),
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Down,
        [
            new Sprite(
                'PlayerDown_1',
                '↑'
            ),
            new Sprite(
                'PlayerDown_2',
                '↑'
            ),
            new Sprite(
                'PlayerDown_3',
                '↑'
            ),
            new Sprite(
                'PlayerDown_2',
                '↑'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Left,
        [
            new Sprite(
                'PlayerLeft_1',
                '↑'
            ),
            new Sprite(
                'PlayerLeft_2',
                '↑'
            ),
            new Sprite(
                'PlayerLeft_3',
                '↑'
            ),
            new Sprite(
                'PlayerLeft_2',
                '↑'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Right,
        [
            new Sprite(
                'PlayerRight_1',
                '↑'
            ),
            new Sprite(
                'PlayerRight_2',
                '↑'
            ),
            new Sprite(
                'PlayerRight_3',
                '↑'
            ),
            new Sprite(
                'PlayerRight_2',
                '↑'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),





    // Moving
    new SpriteSet(
        Enums.ActorStatus.Moving,
        Enums.Direction.Up,
        [
            new Sprite(
                'PlayerUp_1',
                '↑'
            ),
            new Sprite(
                'PlayerUp_2',
                '↑'
            ),
            new Sprite(
                'PlayerUp_3',
                '↑'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Moving,
        Enums.Direction.Down,
        [
            new Sprite(
                'PlayerDown_1',
                '↓'
            ),
            new Sprite(
                'PlayerDown_2',
                '↓'
            ),
            new Sprite(
                'PlayerDown_3',
                '↓'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Moving,
        Enums.Direction.Left,
        [
            new Sprite(
                'PlayerLeft_1',
                '←'
            ),
            new Sprite(
                'PlayerLeft_2',
                '←'
            ),
            new Sprite(
                'PlayerLeft_3',
                '←'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Moving,
        Enums.Direction.Right,
        [
            new Sprite(
                'PlayerRight_1',
                '→'
            ),
            new Sprite(
                'PlayerRight_2',
                '→'
            ),
            new Sprite(
                'PlayerRight_3',
                '→'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    )

];
