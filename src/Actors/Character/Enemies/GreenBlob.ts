class GreenBlob extends Chaser{
  startingHealth: number = 2;
  health: number = this.startingHealth;
  name: string = 'Green Blob';
  moveTickDuration: number = 2;
  viewRadius: number = 15;

  constructor(game: Game){
    super(game);

    this.blocksSight = false; // it's short and we can see over it
    this.spritesets = Sprites.GreenBlobSprites();

    // Initialize level as the same as the player
    this.level = Battle.getLevelModifierForActor(game.player);
    this.xpBounty = 1 + this.level * 2;
  }
}
