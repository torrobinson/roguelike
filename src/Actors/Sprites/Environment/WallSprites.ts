import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const WallSprites = [

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Up,
        [
            new Sprite(
                'WallUp',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Right,
        [
            new Sprite(
                'WallRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpRight,
        [
            new Sprite(
                'WallUpRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Down,
        [
            new Sprite(
                'WallDown',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpDown,
        [
            new Sprite(
                'WallUpDown',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.DownRight,
        [
            new Sprite(
                'WallDownRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpDownRight,
        [
            new Sprite(
                'WallUpDownRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Left,
        [
            new Sprite(
                'WallLeft',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpLeft,
        [
            new Sprite(
                'WallUpLeft',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.LeftRight,
        [
            new Sprite(
                'WallLeftRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpLeftRight,
        [
            new Sprite(
                'WallUpLeftRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.DownLeft,
        [
            new Sprite(
                'WallDownLeft',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpDownLeft,
        [
            new Sprite(
                'WallUpDownLeft',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.DownLeftRight,
        [
            new Sprite(
                'WallDownLeftRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.UpDownLeftRight,
        [
            new Sprite(
                'WallUpDownLeftRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    ),
    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.None,
        [
            new Sprite(
                'WallNone',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    )

];
