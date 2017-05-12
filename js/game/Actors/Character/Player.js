class Player extends Actor{

  constructor(game){
    super(game);
    this.doesSubscribeToTicks = true;
    this.moveTickDuration = 1;
    this.viewRadius = 15;
    this.fogged = false;

    this.defaultAttackPower = 1;
    this.startingHealth = 10;
    this.name = 'You';

    this.spritesets = PlayerSprites;

    this.init();
    this.initStats();
  }

  move(direction){
    super.move(direction);
    // When we move, we want to start the animation over the next turn
    this.restartSpriteNextFrame = true;
  }

  initStats(){
    this.runStats = {
      kills:  0
    };
  }

  reset(){
    this.health = this.startingHealth;
    this.clearCommands();
    this.equippedWeapon = null;
    this.inventory = [];
  }

  collidedInto(actor){
    // Call base Actor collision
    super.collidedInto(actor);
    // When the player touches the stairs, generate the next dungeon
    if(actor instanceof StairsDown){
      this.game.setRandomDungeon();
    }
    else if(actor instanceof Chaser){
      this.attack(actor, this.defaultAttackPower);
    }
  }

  tick(){
    super.tick();
    this.revealWorld();
  }

  tryUseInventory(inventoryItemType){
    for(var i=0; i<this.inventory.length; i++){
      var item = this.inventory[i];
      if(item instanceof inventoryItemType){
        this.useItem(item);
      }
    }
  }

  useItem(item){
    item.use();
  }

  attackedBy(attacker, damage){
    super.attackedBy(attacker, damage);
    this.game.log('You were damaged by ' + attacker.name + ' for ' + damage + 'HP');
  }

  attack(otherActor, damage){
    super.attack(otherActor, damage);
    this.game.log('You attacked ' + otherActor.name + ' for ' + damage + 'HP');
  }

  die(){
      super.die();
      this.game.setRandomDungeon();
      this.reset();
      this.game.gameTick(this.game);
  }

  madeKill(killedActor){
    super.madeKill(killedActor);
    this.runStats.kills++;
    this.game.log('You killed ' + killedActor.name);
  }

  // Unfog the world as it's explored
  revealWorld(){
    // If we're placed
    if(this.location!==null){

      // Visibility is based on line-of-site and radius around the player that's not obscured
      //  on the main collision/wall layer.

      var wallLayer = this.world.getLayersOfType(LayerType.Wall).first();
      var floorLayer = this.world.getLayersOfType(LayerType.Floor).first();

      // Based on the radius around the player and line-of-sight with walls and other
      //  wall-layered objects, see if they can see other tiles
      for(var y=this.location.y-this.viewRadius; y<this.location.y+this.viewRadius; y++){
        for(var x=this.location.x-this.viewRadius; x<this.location.x+this.viewRadius; x++){
          if(y>=0 && y< wallLayer.height && x>=0 && x< wallLayer.width){ // If it's in-bounds
            // The point to trace TO
            var point = new Point(x,y);

            // If we can see this point in the world
            if(this.canSeePoint(point, this.viewRadius)){

              // Unfog wall/collision pieces
              var actor = wallLayer.getTile(point.x,point.y);
              if(actor !== null && actor.fogged){
                actor.fogged = false;
              }

              // Unfog floor pieces
              var floor = floorLayer.getTile(point.x,point.y);
              if(floor !== null && floor.fogged){
                floor.fogged = false;
              }
            }
            else if(Geometry.IsPointInCircle(this.location, this.viewRadius, point)){
              // Regardless if we can see it, clear pieces by radious alone,
              //  ignoring line of sight


              // Unfog blocked surrounded wall pieces OR side pieces within view radius
              var surroundedWall = wallLayer.getTile(point.x,point.y);
              if(surroundedWall !== null
                && surroundedWall.fogged
                && (surroundedWall.facing === Directions.UpDownLeftRight
                || (
                  surroundedWall.location.x === 0
                  || surroundedWall.location.y === 0
                  || surroundedWall.location.y === this.layer.tiles.length - 1
                  || surroundedWall.location.x === this.layer.tiles[0].length - 1
                  )
                )
              ){
                surroundedWall.fogged = false;
              }

            }

          }
        }
      }
    }

  }

}
