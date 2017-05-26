class Player extends Actor {
    runStats: RunStats;
    startingHealth: number = 10;
    health: number = this.startingHealth;
    moveTickDuration: number = 1;
    name: string = 'You';
    viewRadius: number = 12;
    totalXP: number = 0;
    doesSubscribeToTicks: boolean = true;
    constructor(game: Game) {
        super(game);
        this.fogged = false;
        this.spritesets = Sprites.PlayerSprites();
        this.level = 0;
        this.xpNeeded = XP.getExperiencePointsRequired(this.level);
        this.initStats();
    }

    move(direction: Direction) {
        super.move(direction);
        // When we move, we want to start the animation over the next turn
        this.restartSpriteNextFrame = true;
    }

    initStats() {
        this.runStats = new RunStats();
    }

    reset() {
        this.health = this.startingHealth;
        this.clearCommands();
        this.equippedWeapon = null;
        this.inventory = [];
    }

    collidedInto(actor: Actor) {
        // Call base Actor collision
        super.collidedInto(actor);
        // When the player touches the stairs, generate the next dungeon
        if (actor instanceof StairsDown) {
            // push the current state of the world to the stack
            this.game.generateNextDungeon();
        }
        else if (actor instanceof Chaser) {
            this.attack(actor);
        }
    }

    tick() {
        super.tick();
        this.revealWorld();
    }

    tryUseInventory(consumable) {
        // Get and use the first instance of the consumable type passed in
        var item: Consumable = <Consumable>this.inventory.where((inv) => { return inv instanceof consumable }).first();
        if (item !== undefined && item !== null) {
            this.useItem(item);
        }
    }

    useItem(item: Consumable) {

        // Don't let the player waste potions if they're at max health
        if (item instanceof Potion && this.health === this.maxHealth()) {
            return;
        }

        item.use();
    }

    equip(equipment: Equipment) {
        equipment.equip();
    }

    giveGold(goldCount: number) {
        this.gold += goldCount;
        this.game.log(
            new LogMessage(
                'You received ' + goldCount + ' gold',
                LogMessageType.ObtainedGold
            )
        );
    }
    takeGold(goldCount: number) {
        this.gold -= goldCount;
        this.game.log(
            new LogMessage(
                'You lost ' + goldCount + ' gold',
                LogMessageType.LostGold
            )
        );
    }


    attackedBy(attacker: Actor, damage: number) {
        super.attackedBy(attacker, damage);
        this.game.log(
            new LogMessage(
                'You were damaged by ' + attacker.name + ' for ' + damage + ' HP',
                LogMessageType.Damaged
            )
        );
    }

    attack(otherActor: Actor) {
        super.attack(otherActor);
        this.game.log(
            new LogMessage(
                'You damaged ' + otherActor.name + ' for ' + this.getDamage() + ' HP',
                LogMessageType.LandedAttack
            )
        );
    }

    die() {
        super.die();
        this.game.generateNextDungeon();
        this.reset();
        this.game.gameTick(this.game);
    }

    madeKill(killedActor: Actor) {
        super.madeKill(killedActor);
        this.runStats.kills++;

        this.game.log(
            new LogMessage(
                'You killed ' + killedActor.name,
                LogMessageType.Informational
            )
        );

        this.giveXP(killedActor.xpBounty);

    }

    giveXP(xp: number, announce: boolean = true) {
        this.currentLevelXP += xp;
        var overflow = 0;
        if (this.currentLevelXP > this.xpNeeded) {
            overflow = this.currentLevelXP - this.xpNeeded;
        }

        this.totalXP += xp - overflow;

        if (announce) {
            this.game.log(
                new LogMessage(
                    'You gained ' + xp + ' XP',
                    LogMessageType.GainedXP
                )
            );
        }

        if (this.currentLevelXP >= this.xpNeeded) {
            this.level++;
            this.currentLevelXP = 0;
            this.xpNeeded = Math.floor(XP.getExperiencePointsRequired(this.level));

            this.game.log(
                new LogMessage(
                    'You levelled up to level ' + this.level,
                    LogMessageType.LevelledUp
                )
            );

            if (overflow > 0) {
                this.giveXP(overflow, false);
            }
            else {
                this.currentLevelXP = 0;
            }

        }
    }

    // Unfog the world as it's explored
    revealWorld() {
        // If we're placed
        if (this.location !== null) {

            // Visibility is based on line-of-site and radius around the player that's not obscured
            //  on the main collision/wall layer.

            var wallLayer = this.world.getLayersOfType(LayerType.Wall).first();
            var floorLayer = this.world.getLayersOfType(LayerType.Floor).first();
            var floorDecorLayer = this.world.getLayersOfType(LayerType.FloorDecor).first();

            // Based on the radius around the player and line-of-sight with walls and other
            //  wall-layered objects, see if they can see other tiles
            for (var y = this.location.y - this.viewRadius; y < this.location.y + this.viewRadius; y++) {
                for (var x = this.location.x - this.viewRadius; x < this.location.x + this.viewRadius; x++) {
                    if (y >= 0 && y < wallLayer.height && x >= 0 && x < wallLayer.width) { // If it's in-bounds
                        // The point to trace TO
                        var point = new Point(x, y);

                        var actor = wallLayer.getTile(point.x, point.y);
                        var floor = floorLayer.getTile(point.x, point.y);
                        var floorDecor = floorDecorLayer.getTile(point.x, point.y);

                        // If we can see this point in the world
                        if (this.canSeePoint(point, this.viewRadius)) {

                            // Unfog wall/collision pieces

                            if (actor !== null && actor.fogged) {
                                actor.fogged = false;
                            }

                            // Unfog floor pieces
                            if (floor !== null && floor.fogged) {
                                floor.fogged = false;
                            }

                            // Unfor floor decor the same way as the floor
                            if (floorDecor !== null && floorDecor.fogged) {
                                floorDecor.fogged = false;
                            }
                        }
                        else if (Geometry.IsPointInCircle(this.location, this.viewRadius, point)) {
                            // Regardless if we can see it, clear pieces by radius alone,
                            //  ignoring line of sight

                            // Unfog blocked surrounded wall pieces OR side pieces within view radius
                            var surroundedWall = wallLayer.getTile(point.x, point.y);
                            if (surroundedWall !== null && surroundedWall.location !== null) {
                                if (surroundedWall.fogged
                                    && (
                                        surroundedWall.facing === Direction.UpDownLeftRight ||
                                        surroundedWall.facing === Direction.UpDownRight ||
                                        surroundedWall.facing === Direction.UpDownLeft ||
                                        surroundedWall.facing === Direction.UpLeftRight ||
                                        surroundedWall.facing === Direction.DownLeftRight ||
                                        (
                                            surroundedWall.location.x === 0
                                            || surroundedWall.location.y === 0
                                            || surroundedWall.location.y === this.layer.tiles.length - 1
                                            || surroundedWall.location.x === this.layer.tiles[0].length - 1
                                        )
                                    )
                                ) {
                                    surroundedWall.fogged = false;
                                }
                            }
                        }

                    }
                }
            }
        }

    }

}
