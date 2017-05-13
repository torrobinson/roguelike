import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const ChaserSprites = [

    // Moving
    new SpriteSet(
        Enums.ActorStatus.Moving,
        Enums.Direction.Up,
        [
            new Sprite(
                'BlobUp_1',
                '↑'
            ),
            new Sprite(
                'BlobUp_2',
                '↑'
            ),
            new Sprite(
                'BlobUp_3',
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
                'BlobDown_1',
                '↓'
            ),
            new Sprite(
                'BlobDown_2',
                '↓'
            ),
            new Sprite(
                'BlobDown_3',
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
                'BlobLeft_1',
                '←'
            ),
            new Sprite(
                'BlobLeft_2',
                '←'
            ),
            new Sprite(
                'BlobLeft_3',
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
                'BlobRight_1',
                '→'
            ),
            new Sprite(
                'BlobRight_2',
                '→'
            ),
            new Sprite(
                'BlobRight_3',
                '→'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),




    // Idle
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Up,
        [
            new Sprite(
                'BlobUp_2',
                '↑'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Down,
        [
            new Sprite(
                'BlobDown_2',
                '↓'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Left,
        [
            new Sprite(
                'BlobLeft_2',
                '←'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Right,
        [
            new Sprite(
                'BlobRight_2',
                '→'
            )
        ],
        Enums.AnimationLoopStyle.Loop
    ),
];
