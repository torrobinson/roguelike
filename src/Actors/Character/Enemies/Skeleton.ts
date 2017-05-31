class Skeleton extends Chaser{
  startingHealth: number = 4;
  health: number = this.startingHealth;
  name: string = 'Skeleton';
  moveTickDuration: number = 1;
  viewRadius: number = 10;

  constructor(game: Game){
    super(game);

    this.blocksSight = false; // it's short and we can see over it
    this.spritesets = Sprites.SkeletonSprites();

    this.attackRange = 2;

    // Initialize level as the same as the player
    this.level = Battle.getLevelModifierForActor(game.player);
    this.xpBounty = 1 + this.level * 2;
  }
}
