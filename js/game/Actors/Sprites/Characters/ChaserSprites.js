const ChaserSprites = [

  // Moving
    new SpriteSet(
      ActorStatus.Moving,
      Directions.Up,
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
      AnimationLoopStyle.Loop,
      15
    ),

    new SpriteSet(
      ActorStatus.Moving,
      Directions.Down,
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
      AnimationLoopStyle.Loop,
      15
    ),

    new SpriteSet(
      ActorStatus.Moving,
      Directions.Left,
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
      AnimationLoopStyle.Loop,
      15
    ),

    new SpriteSet(
      ActorStatus.Moving,
      Directions.Right,
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
      AnimationLoopStyle.Loop,
      15
    ),




    // Idle
    new SpriteSet(
      ActorStatus.Idle,
      Directions.Up,
      [
        new Sprite(
          'BlobUp_2',
          '↑'
        )
      ]
    ),

    new SpriteSet(
      ActorStatus.Idle,
      Directions.Down,
      [
        new Sprite(
          'BlobDown_2',
          '↓'
        )
      ]
    ),

    new SpriteSet(
      ActorStatus.Idle,
      Directions.Left,
      [
        new Sprite(
          'BlobLeft_2',
          '←'
        )
      ]
    ),

    new SpriteSet(
      ActorStatus.Idle,
      Directions.Right,
      [
        new Sprite(
          'BlobRight_2',
          '→'
        )
      ]
    ),
];
