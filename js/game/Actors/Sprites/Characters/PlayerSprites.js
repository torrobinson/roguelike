const PlayerSprites = [

    // Idle
    new SpriteSet(
      ActorStatus.Idle,
      Directions.Up,
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
      Directions.Down,
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
      Directions.Left,
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
      Directions.Right,
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
      Directions.Up,
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
      Directions.Down,
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
      Directions.Left,
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
      Directions.Right,
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

];
