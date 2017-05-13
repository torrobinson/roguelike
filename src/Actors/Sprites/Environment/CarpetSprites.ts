import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { SpriteSet } from 'src/Actors/Sprites/SpriteSet'

export const CarpetSprites = [

    new SpriteSet(
        Enums.ActorStatus.Idle,
        Enums.Direction.Up,
        [
            new Sprite(
                'CarpetUp',
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
                'CarpetRight',
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
                'CarpetUpRight',
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
                'CarpetDown',
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
                'CarpetUpDown',
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
                'CarpetDownRight',
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
                'CarpetUpDownRight',
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
                'CarpetLeft',
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
                'CarpetUpLeft',
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
                'CarpetLeftRight',
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
                'CarpetUpLeftRight',
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
                'CarpetDownLeft',
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
                'CarpetUpDownLeft',
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
                'CarpetDownLeftRight',
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
                'CarpetUpDownLeftRight',
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
                'CarpetUpDownLeftRight',
                '#'
            )
        ],
        Enums.AnimationLoopStyle.Static
    )

];
