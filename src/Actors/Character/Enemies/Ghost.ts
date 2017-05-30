class Ghost extends Chaser{
  startingHealth: number = 1;
  health: number = this.startingHealth;
  name: string = 'Ghost';
  moveTickDuration: number = 3;
  viewRadius: number = 25;

  constructor(game: Game){
    super(game);

    this.blocksSight = false; // it's short and we can see over it
    this.spritesets = Sprites.GhostSprites();

    // Initialize level as the same as the player
    this.level = Battle.getLevelModifierForActor(game.player);
    this.xpBounty = 1 + this.level * 2;
  }
}
