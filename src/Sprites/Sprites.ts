class Sprites {
    static ChaserSprites() {
        return [

            // Moving
            new SpriteSet(
                ActorStatus.Moving,
                Direction.Up,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Down,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Left,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Right,
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
                AnimationLoopStyle.Loop
            ),




            // Idle
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Up,
                [
                    new Sprite(
                        'BlobUp_2',
                        '↑'
                    )
                ],
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'BlobDown_2',
                        '↓'
                    )
                ],
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Left,
                [
                    new Sprite(
                        'BlobLeft_2',
                        '←'
                    )
                ],
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Right,
                [
                    new Sprite(
                        'BlobRight_2',
                        '→'
                    )
                ],
                AnimationLoopStyle.Loop
            ),
        ]
    };


    static PlayerSprites() {
        return [

            // Idle
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Up,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Left,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Right,
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
                AnimationLoopStyle.Loop
            ),





            // Moving
            new SpriteSet(
                ActorStatus.Moving,
                Direction.Up,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Down,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Left,
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
                AnimationLoopStyle.Loop
            ),

            new SpriteSet(
                ActorStatus.Moving,
                Direction.Right,
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
                AnimationLoopStyle.Loop
            )

        ]
    };

    static OutOfBoundsSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'WallDarkDown',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),
        ]
    };


    static StairsDownSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'LadderTopDown',
                        '%'
                    )
                ],
                AnimationLoopStyle.Static
            ),
        ]
    };


    static StairsUpSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'LadderBottomDown',
                        '%'
                    )
                ],
                AnimationLoopStyle.Static
            ),
        ]
    };


    static BookshelfSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'BookshelfDown',
                        'B'
                    )
                ],
                AnimationLoopStyle.Static
            ),

        ]
    };

    static TorchSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'TorchDown',
                        'T'
                    )
                ],
                AnimationLoopStyle.Static
            ),

        ]
    };

    static CarpetSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Up,
                [
                    new Sprite(
                        'CarpetUp',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Right,
                [
                    new Sprite(
                        'CarpetRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpRight,
                [
                    new Sprite(
                        'CarpetUpRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'CarpetDown',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDown,
                [
                    new Sprite(
                        'CarpetUpDown',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownRight,
                [
                    new Sprite(
                        'CarpetDownRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownRight,
                [
                    new Sprite(
                        'CarpetUpDownRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Left,
                [
                    new Sprite(
                        'CarpetLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpLeft,
                [
                    new Sprite(
                        'CarpetUpLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.LeftRight,
                [
                    new Sprite(
                        'CarpetLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpLeftRight,
                [
                    new Sprite(
                        'CarpetUpLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownLeft,
                [
                    new Sprite(
                        'CarpetDownLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownLeft,
                [
                    new Sprite(
                        'CarpetUpDownLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownLeftRight,
                [
                    new Sprite(
                        'CarpetDownLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownLeftRight,
                [
                    new Sprite(
                        'CarpetUpDownLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.None,
                [
                    new Sprite(
                        'CarpetUpDownLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            )

        ]
    };


    static FloorSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'Cobblestone4Down',
                        '.'
                    )
                ],
                AnimationLoopStyle.Static
            ),

        ]
    };

    static PillarSprites() {
        return [
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'PillarDown',
                        'P'
                    )
                ],
                AnimationLoopStyle.Static
            ),

        ]
    };


    static WallSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Up,
                [
                    new Sprite(
                        'WallUp',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Right,
                [
                    new Sprite(
                        'WallRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpRight,
                [
                    new Sprite(
                        'WallUpRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'WallDown',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDown,
                [
                    new Sprite(
                        'WallUpDown',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownRight,
                [
                    new Sprite(
                        'WallDownRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownRight,
                [
                    new Sprite(
                        'WallUpDownRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.Left,
                [
                    new Sprite(
                        'WallLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpLeft,
                [
                    new Sprite(
                        'WallUpLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.LeftRight,
                [
                    new Sprite(
                        'WallLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpLeftRight,
                [
                    new Sprite(
                        'WallUpLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownLeft,
                [
                    new Sprite(
                        'WallDownLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownLeft,
                [
                    new Sprite(
                        'WallUpDownLeft',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.DownLeftRight,
                [
                    new Sprite(
                        'WallDownLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.UpDownLeftRight,
                [
                    new Sprite(
                        'WallUpDownLeftRight',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            ),
            new SpriteSet(
                ActorStatus.Idle,
                Direction.None,
                [
                    new Sprite(
                        'WallNone',
                        '#'
                    )
                ],
                AnimationLoopStyle.Static
            )

        ]
    };

    static ChestSprites() {
        return [

            new SpriteSet(
                ActorStatus.Closed,
                Direction.Down,
                [
                    new Sprite(
                        'ChestClosedDown',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),

            new SpriteSet(
                ActorStatus.Open,
                Direction.Down,
                [
                    new Sprite(
                        'ChestOpenDown',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),

        ]
    };

    static PotionSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'PotionSilver',
                        ' '
                    ),
                    new Sprite(
                        'PotionBlack',
                        ' '
                    ),
                    new Sprite(
                        'PotionPurple',
                        ' '
                    ),
                    new Sprite(
                        'PotionGreen',
                        ' '
                    ),
                    new Sprite(
                        'PotionRed',
                        ' '
                    ),
                    new Sprite(
                        'PotionDarkBlue',
                        ' '
                    ),
                    new Sprite(
                        'PotionBrown',
                        ' '
                    ),
                    new Sprite(
                        'PotionBlue',
                        ' '
                    ),
                    new Sprite(
                        'PotionGold',
                        ' '
                    ),
                    new Sprite(
                        'PotionOrange',
                        ' '
                    ),
                    new Sprite(
                        'PotionWhite',
                        ' '
                    ),
                    new Sprite(
                        'PotionDarkerBlue',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static GoldPileSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'CoinStack',
                        ' '
                    ),
                    new Sprite(
                        'CoinPile',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static ShirtSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'Shirt',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static ChestplaceSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'ChestArmor',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static DaggerSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'Dagger1',
                        ' '
                    ),
                    new Sprite(
                        'Dagger2',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static LeatherBootsSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'BootsBrown',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static SteelBootsSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'BootsBlack',
                        ' '
                    )
                ],
                AnimationLoopStyle.RandomStatic
            )
        ]
    };

    static CrossGraveSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'GraveCrossDown',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            )
        ]
    };

    static TombstoneSprites() {
        return [

            new SpriteSet(
                ActorStatus.Idle,
                Direction.Down,
                [
                    new Sprite(
                        'TombstoneDown',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            )
        ]
    };

    static DoorSprites() {
        return [

          // Vertical Doors
            new SpriteSet(
                ActorStatus.Closed,
                Direction.Down,
                [
                    new Sprite(
                        'DoorDownClosed',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),

            new SpriteSet(
                ActorStatus.Open,
                Direction.Down,
                [
                    new Sprite(
                        'DoorDownOpen',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),


          // Horizontal Doors
            new SpriteSet(
                ActorStatus.Closed,
                Direction.Left,
                [
                    new Sprite(
                        'DoorLeftClosed',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            ),

            new SpriteSet(
                ActorStatus.Open,
                Direction.Left,
                [
                    new Sprite(
                        'DoorLeftOpen',
                        ' '
                    )
                ],
                AnimationLoopStyle.Static
            )
        ]
    };


}
