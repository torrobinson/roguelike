var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["UpRight"] = 3] = "UpRight";
    Direction[Direction["Down"] = 4] = "Down";
    Direction[Direction["UpDown"] = 5] = "UpDown";
    Direction[Direction["DownRight"] = 6] = "DownRight";
    Direction[Direction["UpDownRight"] = 7] = "UpDownRight";
    Direction[Direction["Left"] = 8] = "Left";
    Direction[Direction["UpLeft"] = 9] = "UpLeft";
    Direction[Direction["LeftRight"] = 10] = "LeftRight";
    Direction[Direction["UpLeftRight"] = 11] = "UpLeftRight";
    Direction[Direction["DownLeft"] = 12] = "DownLeft";
    Direction[Direction["UpDownLeft"] = 13] = "UpDownLeft";
    Direction[Direction["DownLeftRight"] = 14] = "DownLeftRight";
    Direction[Direction["UpDownLeftRight"] = 15] = "UpDownLeftRight";
})(Direction || (Direction = {}));
var SizeCategory;
(function (SizeCategory) {
    SizeCategory[SizeCategory["Tiny"] = 36] = "Tiny";
    SizeCategory[SizeCategory["Small"] = 81] = "Small";
    SizeCategory[SizeCategory["Medium"] = 100] = "Medium";
    SizeCategory[SizeCategory["Large"] = 200] = "Large";
    SizeCategory[SizeCategory["Huge"] = 9999] = "Huge";
})(SizeCategory || (SizeCategory = {}));
var RoomDecorationType;
(function (RoomDecorationType) {
    RoomDecorationType[RoomDecorationType["Nothing"] = 0] = "Nothing";
    RoomDecorationType[RoomDecorationType["Atrium"] = 1] = "Atrium";
    RoomDecorationType[RoomDecorationType["Library"] = 2] = "Library";
})(RoomDecorationType || (RoomDecorationType = {}));
var LayerType;
(function (LayerType) {
    LayerType[LayerType["Wall"] = 1] = "Wall";
    LayerType[LayerType["FloorDecor"] = 2] = "FloorDecor";
    LayerType[LayerType["Floor"] = 3] = "Floor";
})(LayerType || (LayerType = {}));
var Control;
(function (Control) {
    Control[Control["UpArrow"] = 38] = "UpArrow";
    Control[Control["DownArrow"] = 40] = "DownArrow";
    Control[Control["LeftArrow"] = 37] = "LeftArrow";
    Control[Control["RightArrow"] = 39] = "RightArrow";
    Control[Control["Space"] = 32] = "Space";
    Control[Control["Enter"] = 13] = "Enter";
    Control[Control["Backspace"] = 8] = "Backspace";
    Control[Control["Escape"] = 27] = "Escape";
    Control[Control["P"] = 80] = "P";
})(Control || (Control = {}));
var ExecutionType;
(function (ExecutionType) {
    ExecutionType[ExecutionType["WaitAndThenExecute"] = 0] = "WaitAndThenExecute";
    ExecutionType[ExecutionType["ExecuteAndThenWait"] = 1] = "ExecuteAndThenWait";
})(ExecutionType || (ExecutionType = {}));
var PathfinderTile;
(function (PathfinderTile) {
    PathfinderTile[PathfinderTile["Walkable"] = 0] = "Walkable";
    PathfinderTile[PathfinderTile["Unwalkable"] = 1] = "Unwalkable";
})(PathfinderTile || (PathfinderTile = {}));
var ActorStatus;
(function (ActorStatus) {
    ActorStatus[ActorStatus["Idle"] = 0] = "Idle";
    ActorStatus[ActorStatus["Moving"] = 1] = "Moving";
    ActorStatus[ActorStatus["Attacking"] = 2] = "Attacking";
    ActorStatus[ActorStatus["Open"] = 3] = "Open";
    ActorStatus[ActorStatus["Closed"] = 4] = "Closed";
})(ActorStatus || (ActorStatus = {}));
var GameState;
(function (GameState) {
    GameState[GameState["NotStarted"] = 0] = "NotStarted";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["Paused"] = 2] = "Paused";
})(GameState || (GameState = {}));
var FogStyle;
(function (FogStyle) {
    FogStyle[FogStyle["Hide"] = 0] = "Hide";
    FogStyle[FogStyle["Darken"] = 1] = "Darken";
})(FogStyle || (FogStyle = {}));
var AnimationLoopStyle;
(function (AnimationLoopStyle) {
    AnimationLoopStyle[AnimationLoopStyle["Static"] = 0] = "Static";
    AnimationLoopStyle[AnimationLoopStyle["Loop"] = 1] = "Loop";
    AnimationLoopStyle[AnimationLoopStyle["Once"] = 2] = "Once";
    AnimationLoopStyle[AnimationLoopStyle["PingPong"] = 3] = "PingPong";
})(AnimationLoopStyle || (AnimationLoopStyle = {}));
var GameDefault;
(function (GameDefault) {
    GameDefault[GameDefault["FramesPerSecond"] = 30] = "FramesPerSecond";
    GameDefault[GameDefault["FrameWaitDuration"] = 15] = "FrameWaitDuration";
    GameDefault[GameDefault["TicksPerSecond"] = 20] = "TicksPerSecond";
})(GameDefault || (GameDefault = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation || (Orientation = {}));
class Enumeration {
    static GetRandomEnumValue(obj, random) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (random.go() < 1 / ++count)
                result = prop;
        return result;
    }
}
class Game {
    constructor(renderer, seed) {
        this.renderer = renderer;
        this.renderer.game = this;
        this.seed = seed;
        this.frameClock = null;
        this.framesPerSecond = GameDefault.FramesPerSecond;
        this.ticksPerSecond = GameDefault.TicksPerSecond;
        this.player = new Player(this);
        this.world = null;
        this.worldStack = [];
        this.state = GameState.NotStarted;
        this.settings = new GameSettings();
        this.renderer.init();
        this.gameLog = ['You enter the dungeon'];
        this.startFrameTimer = (game) => {
            game.frameClock = setInterval(() => {
                game.frameTick(game);
            }, (1 / game.framesPerSecond) * 1000);
        };
        this.menu = MainMenu;
        this.menu.linkToGame(this);
    }
    start() {
        this.state = GameState.Playing;
        this.startFrameTimer(this);
        this.gameTick(this);
    }
    pause() {
        this.state = GameState.Paused;
    }
    unpause() {
        this.state = GameState.Playing;
    }
    log(text) {
        this.gameLog.push(text);
    }
    getLastLog() {
        return this.gameLog.last();
    }
    frameTick(game) {
        var centerPoint = game.player.location;
        if (centerPoint === null) {
            centerPoint = new Point(Math.floor(game.world.width / 2), Math.floor(game.world.height / 2));
        }
        game.renderer.drawFrame(game.world, centerPoint);
    }
    gameTick(game) {
        if (this.state !== GameState.Paused) {
            var actorsToTick = this.getTickableActors();
            for (var a = 0; a < actorsToTick.length; a++) {
                actorsToTick[a].tick();
            }
        }
    }
    getTickableActors() {
        var tickableActors = [];
        if (this.world !== null) {
            var actor = null;
            for (var l = 0; l < this.world.layers.length; l++) {
                for (var y = 0; y < this.world.layers[l].tiles.length; y++) {
                    for (var x = 0; x < this.world.layers[l].tiles[y].length; x++) {
                        actor = this.world.layers[l].getTile(x, y);
                        if (actor instanceof Actor && actor.doesSubscribeToTicks) {
                            tickableActors.push(actor);
                        }
                    }
                }
            }
        }
        var player = null;
        for (var actor of tickableActors) {
            if (actor instanceof Player) {
                player = actor;
                tickableActors.remove(player);
            }
        }
        if (player !== null) {
            tickableActors.unshift(player);
        }
        return tickableActors;
    }
    controlPressed(control) {
        if (this.state === GameState.Paused) {
            if (control === Control.UpArrow) {
                this.menu.navUp();
            }
            if (control === Control.DownArrow) {
                this.menu.navDown();
            }
            if (control === Control.Enter || control === Control.Space) {
                this.menu.executeCurrentOption();
            }
            if (control === Control.Backspace) {
                this.menu.goBackAPage();
            }
            if (control === Control.Escape) {
                this.unpause();
                this.menu.resetNavStack();
            }
            return;
        }
        if (this.state === GameState.Playing) {
            if ([Control.UpArrow, Control.DownArrow, Control.LeftArrow, Control.RightArrow].contains(control)) {
                if (!this.player.isMoving()) {
                    var directionToMove = Movement.ControlArrowToDirection(control);
                    var offset = Movement.DirectionToOffset(directionToMove);
                    var resultLocation = Movement.AddPoints(this.player.location, offset);
                    this.player.addCommand(new MoveTo(this.player, resultLocation));
                }
                this.gameTick(this);
            }
            if (control === Control.Escape) {
                this.pause();
            }
            if (control === Control.P) {
                this.player.tryUseInventory(Potion);
            }
            return;
        }
    }
    setRandomDungeon() {
        console.log('Generating dungeon with seed "' + this.seed + '"');
        this.seed++;
        var settings = new WorldGeneratorSettings();
        settings.totalWidth = 100;
        settings.totalHeight = 100;
        settings.minRoomWidth = 3;
        settings.maxRoomWidth = 20;
        settings.minRoomHeight = 3;
        settings.maxRoomHeight = 20;
        settings.minNumRooms = 24;
        settings.maxNumRooms = 120;
        settings.minHallThickness = 1;
        settings.maxHallThickness = 5;
        settings.retryAttempts = 1000;
        settings.floorActorType = Floor;
        this.world = WorldGenerator.GenerateCarvedWorld(this.seed, settings, this);
        var decoratorSettings = new WorldDecoratorSettings();
        var decorator = new WorldDecorator(decoratorSettings, this.seed);
        decorator.decorate(this.world);
        this.player.world = this.world;
        var mainLayer = this.world.layers.filter(function (layer) {
            return layer.type == LayerType.Wall;
        }).first();
        var starterRoomCenter = this.world.rooms.first().getCenter();
        var lastRoomCenter = this.world.rooms.last().getCenter();
        var spawnLocation = new Point(starterRoomCenter.x, starterRoomCenter.y);
        var exitLocation = new Point(lastRoomCenter.x, lastRoomCenter.y);
        var stairsUp = new StairsUp(this);
        mainLayer.placeActor(stairsUp, spawnLocation);
        mainLayer.placeActor(this.player, Movement.AddPoints(spawnLocation, new Point(0, 1)));
        var exit = new StairsDown(this);
        mainLayer.placeActor(exit, exitLocation);
        var chaser = new Chaser(this);
        mainLayer.placeActor(chaser, exitLocation.offsetBy(1, 1));
        var chaser2 = new Chaser(this);
        mainLayer.placeActor(chaser2, exitLocation.offsetBy(0, 1));
        var chaser3 = new Chaser(this);
        mainLayer.placeActor(chaser3, exitLocation.offsetBy(1, 0));
        var chaser4 = new Chaser(this);
        mainLayer.placeActor(chaser4, exitLocation.offsetBy(-1, -1));
        var chaser5 = new Chaser(this);
        mainLayer.placeActor(chaser5, exitLocation.offsetBy(-1, 0));
        var chaser6 = new Chaser(this);
        mainLayer.placeActor(chaser6, exitLocation.offsetBy(0, -1));
        var chaser7 = new Chaser(this);
        mainLayer.placeActor(chaser7, exitLocation.offsetBy(1, -1));
        var chaser8 = new Chaser(this);
        mainLayer.placeActor(chaser8, exitLocation.offsetBy(-1, 1));
        var demoChest = new Chest(this, [new Potion()]);
        mainLayer.placeActor(demoChest, this.world.rooms.second().getCenter());
    }
}
class GameSettings {
    constructor() {
        this.showHealth = false;
    }
}
class Layer {
    constructor(width, height, zIndex, name, type) {
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
        this.name = name;
        this.type = type;
        this.tiles = [];
        this.clear();
    }
    setTile(x, y, actor) {
        this.tiles[y][x] = actor;
    }
    destroyTile(x, y) {
        this.setTile(x, y, null);
    }
    getTile(x, y) {
        return this.tiles[y][x];
    }
    fillWith(actorType, gameReference) {
        this.tiles = [];
        for (var y = 0; y < this.height; y++) {
            var newRow = [];
            for (var x = 0; x < this.width; x++) {
                if (actorType !== null) {
                    var actor = new actorType(gameReference);
                    actor.location = new Point(x, y);
                    newRow.push(actor);
                }
                else {
                    newRow.push(null);
                }
            }
            this.tiles.push(newRow);
        }
    }
    placeActor(actor, location) {
        this.setTile(location.x, location.y, actor);
        if (actor !== null) {
            actor.location = location;
            actor.layer = this;
        }
    }
    clear() {
        this.fillWith(null, null);
    }
    getCollisionGrid(ignorePointA, ignorePointB) {
        var grid = [];
        for (var y = 0; y < this.tiles.length; y++) {
            var row = [];
            for (var x = 0; x < this.tiles[y].length; x++) {
                var actor = this.getTile(x, y);
                if (actor === null || (x == ignorePointA.x && y == ignorePointA.y) || (x == ignorePointB.x && y == ignorePointB.y)) {
                    row.push(PathfinderTile.Walkable);
                }
                else {
                    row.push(PathfinderTile.Unwalkable);
                }
            }
            grid.push(row);
        }
        return grid;
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static getDistanceBetweenPoints(point1, point2) {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    }
    offsetBy(x, y) {
        return new Point(this.x + x, this.y + y);
    }
    reverse() {
        var y = this.y;
        this.y = this.x;
        this.x = y;
    }
}
class Room {
    constructor(width, height, position) {
        this.width = width;
        this.height = height;
        this.position = position;
    }
    getArea() {
        return this.width * this.height;
    }
    getCenter() {
        return new Point(Math.floor((this.left() + this.right()) / 2), Math.floor((this.top() + this.bottom()) / 2));
    }
    getSizeCategory() {
        var area = this.getArea();
        if (area < SizeCategory.Tiny)
            return SizeCategory.Tiny;
        else if (area < SizeCategory.Small)
            return SizeCategory.Small;
        else if (area < SizeCategory.Medium)
            return SizeCategory.Medium;
        else if (area < SizeCategory.Large)
            return SizeCategory.Large;
        else
            return SizeCategory.Huge;
    }
    left() {
        return this.position.x;
    }
    right() {
        return this.position.x + this.width;
    }
    top() {
        return this.position.y;
    }
    bottom() {
        return this.position.y + this.height;
    }
    topLeft() {
        return new Point(this.position.x, this.position.y);
    }
    topRight() {
        return new Point(this.position.x + this.width, this.position.y);
    }
    bottomLeft() {
        return new Point(this.position.x, this.position.y + this.height);
    }
    bottomRight() {
        return new Point(this.position.x + this.width, this.position.y + this.height);
    }
    static Intersects(a, b) {
        return (a.left() <= b.right() &&
            b.left() <= a.right() &&
            a.top() <= b.bottom() &&
            b.top() <= a.bottom());
    }
}
class World {
    constructor(width, height, game) {
        this.width = width;
        this.height = height;
        this.layers = [];
        this.rooms = [];
        this.game = game;
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    getLayersOfType(layerType) {
        return this.layers.filter(function (layer) {
            return layer.type === layerType;
        });
    }
    getLayersNotOfType(layerType) {
        return this.layers.filter(function (layer) {
            return layer.type !== layerType;
        });
    }
}
class Actor {
    constructor(game) {
        this.facing = Direction.Down;
        this.location = null;
        this.layer = null;
        this.commands = [];
        this.currentCommand = null;
        this.ticksUntilNextAction = null;
        this.doesSubscribeToTicks = false;
        this.moveTickDuration = 1;
        this.spritesets = null;
        this.name = '';
        this.status = ActorStatus.Idle;
        this.viewRadius = 5;
        this.defaultAttackPower = 1;
        this.inventory = [];
        this.equippedWeapon = null;
        this.fogged = true;
        this.fogStyle = FogStyle.Hide;
        this.blocksSight = true;
        this.restartSpriteNextFrame = false;
        this.startingHealth = undefined;
        this.health = this.startingHealth;
        this.world = null;
        this.game = game;
    }
    getSprite() {
        if (this.spritesets !== null) {
            var sprite = this.spritesets.filter(function (spriteset) {
                return spriteset.status === this.status && spriteset.direction === this.facing;
            }, this).first().getSprite(this.restartSpriteNextFrame);
            this.restartSpriteNextFrame = false;
            return sprite;
        }
        else {
            return null;
        }
    }
    isMoving() {
        return this.status === ActorStatus.Moving;
    }
    attack(otherActor, damage) {
        otherActor.attackedBy(this, damage);
    }
    attackedBy(attacker, damage) {
        this.health -= damage;
        if (this.health <= 0) {
            attacker.madeKill(this);
            this.die();
        }
    }
    madeKill(killedActor) {
    }
    die() {
        this.layer.setTile(this.location.x, this.location.y, null);
        this.destroy();
    }
    move(direction) {
        this.facing = direction;
        var offsetToMove = Movement.DirectionToOffset(direction);
        if (this.layer !== null) {
            var moveTo = Movement.AddPoints(this.location, offsetToMove);
            var result = Movement.TryMove(this, this.layer, moveTo);
            if (result) {
            }
            else {
                var actorHit = this.layer.getTile(moveTo.x, moveTo.y);
                this.collidedInto(actorHit);
                actorHit.collidedBy(this);
            }
        }
        this.restartSpriteNextFrame = true;
    }
    collided() {
    }
    collidedInto(actor) {
        this.collided();
    }
    collidedBy(actor) {
        this.collided();
    }
    cancelCurrentCommand() {
        this.currentCommand = null;
    }
    addCommand(command) {
        this.commands.push(command);
        if (this.currentCommand === null) {
            this.currentCommand = this.popCommand();
            this.currentCommand.setNextActionIfEmpty();
        }
    }
    clearCommands() {
        this.commands = [];
        this.currentCommand = null;
        this.ticksUntilNextAction = null;
    }
    interruptWithCommand(command) {
        var ticksUntilNextAction = this.ticksUntilNextAction;
        var ignoreExecutionUntilNextFire = this.currentCommand.ignoreExecutionUntilNextFire;
        this.clearCommands();
        this.addCommand(command);
        this.currentCommand.ignoreExecutionUntilNextFire = ignoreExecutionUntilNextFire;
        this.ticksUntilNextAction = ticksUntilNextAction;
    }
    popCommand() {
        if (this.commands.length > 0) {
            var nextCommand = this.commands[0];
            this.commands.shift();
            return nextCommand;
        }
        else {
            return null;
        }
    }
    tick() {
        if (!this.doesSubscribeToTicks)
            return;
        if (this.ticksUntilNextAction !== null) {
            this.ticksUntilNextAction--;
        }
        if (this.currentCommand !== null && this.currentCommand.currentAction !== null) {
            if (this.currentCommand.ignoreExecutionUntilNextFire === false && this.currentCommand.currentAction.executionType === ExecutionType.ExecuteAndThenWait) {
                this.currentCommand.execute();
                if (this.currentCommand !== null) {
                    this.currentCommand.ignoreExecutionUntilNextFire = true;
                }
            }
        }
        if (this.ticksUntilNextAction !== null && this.ticksUntilNextAction <= 0) {
            if (this.currentCommand !== null) {
                if (this.currentCommand.currentAction !== null) {
                    if (this.currentCommand.currentAction.executionType === ExecutionType.WaitAndThenExecute) {
                        this.currentCommand.execute();
                    }
                    this.currentCommand.ignoreExecutionUntilNextFire = false;
                }
                this.ticksUntilNextAction = null;
                var nextAction = this.currentCommand.currentAction;
                if (nextAction !== null) {
                    this.ticksUntilNextAction = nextAction.tickDuration;
                }
                else {
                    this.currentCommand = null;
                }
            }
        }
        if (this.currentCommand === null) {
            if (this.commands.length > 0) {
                this.currentCommand = this.popCommand();
                if (this.currentCommand !== null && this.currentCommand.currentAction !== null) {
                    this.ticksUntilNextAction = this.currentCommand.currentAction.tickDuration;
                }
            }
        }
        if (this.ticksUntilNextAction === null) {
            this.status = ActorStatus.Idle;
        }
    }
    canSeePoint(point, range) {
        return Geometry.IsPointInCircle(this.location, range, point) &&
            Geometry.PointCanSeePoint(this.location, point, this.layer);
    }
    canBeSeenByPoint(point, range) {
        return Geometry.IsPointInCircle(point, range, this.location) &&
            Geometry.PointCanSeePoint(point, this.location, this.layer);
    }
    canSeeActor(actor) {
        return this.canSeePoint(actor.location, this.viewRadius);
    }
    canBeSeenByActor(actor) {
        return this.canBeSeenByPoint(actor.location, actor.viewRadius);
    }
    obtainInventoryItem(inventoryItem) {
        inventoryItem.holder = this;
        this.inventory.push(inventoryItem);
        this.game.log(this.name + ' obtained ' + inventoryItem.name);
    }
    destroy() {
        this.doesSubscribeToTicks = false;
    }
}
class Action {
    constructor(command) {
        this.tickDuration = 1;
        this.executionType = ExecutionType.WaitAndThenExecute;
        this.command = command;
    }
    getActor() {
        return this.command.actor;
    }
    execute() {
    }
}
class Command {
    constructor(actor) {
        this.actions = [];
        this.currentAction = null;
        this.lastAction = null;
        this.actor = actor;
        this.ignoreExecutionUntilNextFire = false;
    }
    addAction(action) {
        this.actions.push(action);
    }
    setNextActionIfEmpty() {
        if (this.currentAction === null) {
            this.currentAction = this.popAction();
            if (this.currentAction !== null) {
                this.actor.ticksUntilNextAction = this.currentAction.tickDuration;
            }
            else {
                this.actor.ticksUntilNextAction = null;
            }
        }
    }
    removeAction(action) {
        this.actions.remove(action);
    }
    insertAction(action, index) {
        this.actions.insert(action, index);
        this.setNextActionIfEmpty();
    }
    popAction() {
        if (this.currentAction !== null)
            this.lastAction = this.currentAction;
        if (this.actions.length > 0) {
            var nextAction = this.actions[0];
            this.actions.shift();
            return nextAction;
        }
        else {
            return null;
        }
    }
    execute() {
        if (this.currentAction !== null) {
            this.currentAction.execute();
            this.currentAction = this.popAction();
        }
    }
    peekNextAction() {
        if (this.actions.length > 0) {
            return this.actions[0];
        }
        else {
            return null;
        }
    }
    hasActionsRemaining() {
        return this.currentAction !== null || this.actions.length > 0;
    }
}
class Move extends Action {
    constructor(command, direction) {
        super(command);
        this.direction = direction;
        this.tickDuration = this.command.actor.moveTickDuration;
        this.executionType = ExecutionType.ExecuteAndThenWait;
    }
    execute() {
        super.execute();
        this.getActor().move(this.direction);
    }
}
class MoveTo extends Command {
    constructor(actor, endPoint, overrideStartPoint) {
        super(actor);
        var startPoint = actor.location;
        if (overrideStartPoint) {
            startPoint = overrideStartPoint;
        }
        if (Point.getDistanceBetweenPoints(startPoint, endPoint) === 1) {
            this.addAction(new Move(this, Movement.AdjacentPointsToDirection(startPoint, endPoint)));
        }
        else {
            var collisionGrid = this.actor.layer.getCollisionGrid(startPoint, endPoint);
            var grid = new PF.Grid(collisionGrid.length, collisionGrid[0].length, collisionGrid);
            var finder = new PF.AStarFinder();
            var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, grid);
            if (path.length > 0) {
                for (var p = 1; p < path.length; p++) {
                    var lastStep = new Point(path[p - 1][0], path[p - 1][1]);
                    var step = new Point(path[p][0], path[p][1]);
                    this.addAction(new Move(this, Movement.AdjacentPointsToDirection(lastStep, step)));
                }
            }
        }
    }
    execute() {
        super.execute();
        this.actor.status = ActorStatus.Moving;
    }
}
class Chaser extends Actor {
    constructor(game) {
        super(game);
        this.startingHealth = 1;
        this.health = this.startingHealth;
        this.name = 'Blob';
        this.moveTickDuration = 2;
        this.viewRadius = 15;
        this.doesSubscribeToTicks = true;
        this.blocksSight = false;
        this.spritesets = Sprites.ChaserSprites();
    }
    collidedInto(actor) {
        super.collidedInto(actor);
        if (actor instanceof Player) {
            this.attack(actor, this.defaultAttackPower);
        }
    }
    tick() {
        super.tick();
        var player = this.game.player;
        var self = this;
        if (self.canSeeActor(player)) {
            var command = new MoveTo(self, player.location);
            if (self.currentCommand !== null) {
                self.interruptWithCommand(command);
            }
            else {
                self.addCommand(command);
            }
        }
        else {
        }
    }
}
class Player extends Actor {
    constructor(game) {
        super(game);
        this.startingHealth = 10;
        this.health = this.startingHealth;
        this.moveTickDuration = 1;
        this.defaultAttackPower = 1;
        this.name = 'You';
        this.viewRadius = 18;
        this.doesSubscribeToTicks = true;
        this.fogged = false;
        this.spritesets = Sprites.PlayerSprites();
        this.initStats();
    }
    move(direction) {
        super.move(direction);
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
    collidedInto(actor) {
        super.collidedInto(actor);
        if (actor instanceof StairsDown) {
            this.game.worldStack.push(this.game.world);
            this.game.setRandomDungeon();
        }
        else if (actor instanceof Chaser) {
            this.attack(actor, this.defaultAttackPower);
        }
    }
    tick() {
        super.tick();
        this.revealWorld();
    }
    tryUseInventory(inventoryItemType) {
        for (var i = 0; i < this.inventory.length; i++) {
            var item = this.inventory[i];
            if (item instanceof inventoryItemType) {
                this.useItem(item);
            }
        }
    }
    useItem(item) {
        item.use();
    }
    attackedBy(attacker, damage) {
        super.attackedBy(attacker, damage);
        this.game.log('You were damaged by ' + attacker.name + ' for ' + damage + 'HP');
    }
    attack(otherActor, damage) {
        super.attack(otherActor, damage);
        this.game.log('You attacked ' + otherActor.name + ' for ' + damage + 'HP');
    }
    die() {
        super.die();
        this.game.setRandomDungeon();
        this.reset();
        this.game.gameTick(this.game);
    }
    madeKill(killedActor) {
        super.madeKill(killedActor);
        this.runStats.kills++;
        this.game.log('You killed ' + killedActor.name);
    }
    revealWorld() {
        if (this.location !== null) {
            var wallLayer = this.world.getLayersOfType(LayerType.Wall).first();
            var floorLayer = this.world.getLayersOfType(LayerType.Floor).first();
            var floorDecorLayer = this.world.getLayersOfType(LayerType.FloorDecor).first();
            for (var y = this.location.y - this.viewRadius; y < this.location.y + this.viewRadius; y++) {
                for (var x = this.location.x - this.viewRadius; x < this.location.x + this.viewRadius; x++) {
                    if (y >= 0 && y < wallLayer.height && x >= 0 && x < wallLayer.width) {
                        var point = new Point(x, y);
                        var actor = wallLayer.getTile(point.x, point.y);
                        var floor = floorLayer.getTile(point.x, point.y);
                        var floorDecor = floorDecorLayer.getTile(point.x, point.y);
                        if (this.canSeePoint(point, this.viewRadius)) {
                            if (actor !== null && actor.fogged) {
                                actor.fogged = false;
                            }
                            if (floor !== null && floor.fogged) {
                                floor.fogged = false;
                            }
                            if (floorDecor !== null && floorDecor.fogged) {
                                floorDecor.fogged = false;
                            }
                        }
                        else if (Geometry.IsPointInCircle(this.location, this.viewRadius, point)) {
                            var surroundedWall = wallLayer.getTile(point.x, point.y);
                            if (surroundedWall !== null
                                && surroundedWall.fogged
                                && (surroundedWall.facing === Direction.UpDownLeftRight
                                    || (surroundedWall.location.x === 0
                                        || surroundedWall.location.y === 0
                                        || surroundedWall.location.y === this.layer.tiles.length - 1
                                        || surroundedWall.location.x === this.layer.tiles[0].length - 1))) {
                                surroundedWall.fogged = false;
                            }
                        }
                    }
                }
            }
        }
    }
}
class RunStats {
    constructor() {
        this.kills = 0;
    }
}
class Bookshelf extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.BookshelfSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}
class Carpet extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.CarpetSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
class Floor extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.FloorSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
class Pillar extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.PillarSprites();
        this.fogStyle = FogStyle.Darken;
        this.blocksSight = false;
    }
}
class Wall extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.WallSprites();
        this.fogStyle = FogStyle.Darken;
    }
}
class OutOfBounds extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.OutOfBoundsSprites();
    }
}
class StairsDown extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.StairsDownSprites();
        this.fogStyle = FogStyle.Hide;
        this.blocksSight = false;
    }
}
class StairsUp extends Actor {
    constructor(game) {
        super(game);
        this.spritesets = Sprites.StairsUpSprites();
        this.fogStyle = FogStyle.Hide;
        this.blocksSight = false;
    }
}
class InventoryItem {
    constructor(holder) {
        this.holder = null;
        this.usesRemaining = 1;
        this.name = '';
        if (holder) {
            this.holder = holder;
        }
    }
    use() {
        this.usesRemaining--;
        if (this.usesRemaining <= 0) {
            this.holder.inventory.remove(this);
        }
    }
}
class Potion extends InventoryItem {
    constructor(holder) {
        super(holder);
        this.name = 'Potion';
        this.healAmount = 10;
    }
    use() {
        super.use();
        if (this.holder !== null) {
            this.holder.health += this.healAmount;
            if (this.holder.health > this.holder.startingHealth) {
                this.holder.health = this.holder.startingHealth;
            }
        }
    }
}
class WorldItem extends Actor {
    constructor(game) {
        super(game);
        this.blocksSight = false;
        this.inventoryItem = null;
    }
    pickedUpBy(actor) {
        if (this.inventoryItem !== null) {
            actor.obtainInventoryItem(this.inventoryItem);
        }
    }
}
class Sprites {
    static ChaserSprites() {
        return [
            new SpriteSet(ActorStatus.Moving, Direction.Up, [
                new Sprite('BlobUp_1', '↑'),
                new Sprite('BlobUp_2', '↑'),
                new Sprite('BlobUp_3', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Down, [
                new Sprite('BlobDown_1', '↓'),
                new Sprite('BlobDown_2', '↓'),
                new Sprite('BlobDown_3', '↓')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Left, [
                new Sprite('BlobLeft_1', '←'),
                new Sprite('BlobLeft_2', '←'),
                new Sprite('BlobLeft_3', '←')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Right, [
                new Sprite('BlobRight_1', '→'),
                new Sprite('BlobRight_2', '→'),
                new Sprite('BlobRight_3', '→')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Up, [
                new Sprite('BlobUp_2', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('BlobDown_2', '↓')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Left, [
                new Sprite('BlobLeft_2', '←')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Right, [
                new Sprite('BlobRight_2', '→')
            ], AnimationLoopStyle.Loop),
        ];
    }
    ;
    static PlayerSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Up, [
                new Sprite('PlayerUp_1', '↑'),
                new Sprite('PlayerUp_2', '↑'),
                new Sprite('PlayerUp_3', '↑'),
                new Sprite('PlayerUp_2', '↑'),
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('PlayerDown_1', '↑'),
                new Sprite('PlayerDown_2', '↑'),
                new Sprite('PlayerDown_3', '↑'),
                new Sprite('PlayerDown_2', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Left, [
                new Sprite('PlayerLeft_1', '↑'),
                new Sprite('PlayerLeft_2', '↑'),
                new Sprite('PlayerLeft_3', '↑'),
                new Sprite('PlayerLeft_2', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Idle, Direction.Right, [
                new Sprite('PlayerRight_1', '↑'),
                new Sprite('PlayerRight_2', '↑'),
                new Sprite('PlayerRight_3', '↑'),
                new Sprite('PlayerRight_2', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Up, [
                new Sprite('PlayerUp_1', '↑'),
                new Sprite('PlayerUp_2', '↑'),
                new Sprite('PlayerUp_3', '↑')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Down, [
                new Sprite('PlayerDown_1', '↓'),
                new Sprite('PlayerDown_2', '↓'),
                new Sprite('PlayerDown_3', '↓')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Left, [
                new Sprite('PlayerLeft_1', '←'),
                new Sprite('PlayerLeft_2', '←'),
                new Sprite('PlayerLeft_3', '←')
            ], AnimationLoopStyle.Loop),
            new SpriteSet(ActorStatus.Moving, Direction.Right, [
                new Sprite('PlayerRight_1', '→'),
                new Sprite('PlayerRight_2', '→'),
                new Sprite('PlayerRight_3', '→')
            ], AnimationLoopStyle.Loop)
        ];
    }
    ;
    static OutOfBoundsSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('WallDarkDown', ' ')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static StairsDownSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('LadderTopDown', '%')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static StairsUpSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('LadderBottomDown', '%')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static BookshelfSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('BookshelfDown', 'B')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static CarpetSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Up, [
                new Sprite('CarpetUp', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Right, [
                new Sprite('CarpetRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpRight, [
                new Sprite('CarpetUpRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('CarpetDown', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDown, [
                new Sprite('CarpetUpDown', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownRight, [
                new Sprite('CarpetDownRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownRight, [
                new Sprite('CarpetUpDownRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Left, [
                new Sprite('CarpetLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpLeft, [
                new Sprite('CarpetUpLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.LeftRight, [
                new Sprite('CarpetLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpLeftRight, [
                new Sprite('CarpetUpLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownLeft, [
                new Sprite('CarpetDownLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownLeft, [
                new Sprite('CarpetUpDownLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownLeftRight, [
                new Sprite('CarpetDownLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownLeftRight, [
                new Sprite('CarpetUpDownLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.None, [
                new Sprite('CarpetUpDownLeftRight', '#')
            ], AnimationLoopStyle.Static)
        ];
    }
    ;
    static FloorSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('Cobblestone4Down', '.')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static PillarSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('PillarDown', 'P')
            ], AnimationLoopStyle.Static),
        ];
    }
    ;
    static WallSprites() {
        return [
            new SpriteSet(ActorStatus.Idle, Direction.Up, [
                new Sprite('WallUp', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Right, [
                new Sprite('WallRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpRight, [
                new Sprite('WallUpRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Down, [
                new Sprite('WallDown', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDown, [
                new Sprite('WallUpDown', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownRight, [
                new Sprite('WallDownRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownRight, [
                new Sprite('WallUpDownRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.Left, [
                new Sprite('WallLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpLeft, [
                new Sprite('WallUpLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.LeftRight, [
                new Sprite('WallLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpLeftRight, [
                new Sprite('WallUpLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownLeft, [
                new Sprite('WallDownLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownLeft, [
                new Sprite('WallUpDownLeft', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.DownLeftRight, [
                new Sprite('WallDownLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.UpDownLeftRight, [
                new Sprite('WallUpDownLeftRight', '#')
            ], AnimationLoopStyle.Static),
            new SpriteSet(ActorStatus.Idle, Direction.None, [
                new Sprite('WallNone', '#')
            ], AnimationLoopStyle.Static)
        ];
    }
    ;
    static ChestSprites() {
        return [
            new SpriteSet(ActorStatus.Closed, Direction.Down, [
                new Sprite('ChestClosedDown', ' ')
            ], AnimationLoopStyle.Static, 0),
            new SpriteSet(ActorStatus.Open, Direction.Down, [
                new Sprite('ChestOpenDown', ' ')
            ], AnimationLoopStyle.Static, 0),
        ];
    }
    ;
}
class Chest extends WorldItem {
    constructor(game, contents) {
        if (!contents) {
            var contents = [];
        }
        super(game);
        this.spritesets = Sprites.ChestSprites();
        this.contents = contents;
        this.inventoryItem = null;
        this.status = ActorStatus.Closed;
    }
    openedBy(actor) {
        if (this.status === ActorStatus.Closed) {
            for (var i = 0; i < this.contents.length; i++) {
                var item = this.contents[i];
                actor.obtainInventoryItem(item);
            }
            this.contents = null;
            this.status = ActorStatus.Open;
        }
    }
    pickedUpBy(actor) {
        this.openedBy(actor);
    }
}
class Color {
    static intToHexString(hex) {
        return '#' + hex.toString(16);
    }
    static hexStringToInt(string) {
        return parseInt('0x' + string.replace('#', ''));
    }
    static shadeBlend(p, c0, c1) {
        var n = p < 0 ? p * -1 : p, u = Math.round, w = parseInt;
        var R, G, B, R1, G1, B1, t;
        var f;
        if (c0.length > 7) {
            f = c0.split(","), t = (c1 ? c1 : p < 0 ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","), R = w(f[0].slice(4)), G = w(f[1]), B = w(f[2]);
            return "rgb(" + (u((w(t[0].slice(4)) - R) * n) + R) + "," + (u((w(t[1]) - G) * n) + G) + "," + (u((w(t[2]) - B) * n) + B) + ")";
        }
        else {
            f = w(c0.slice(1), 16), t = w((c1 ? c1 : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF;
            return "#" + (0x1000000 + (u(((t >> 16) - R1) * n) + R1) * 0x10000 + (u(((t >> 8 & 0x00FF) - G1) * n) + G1) * 0x100 + (u(((t & 0x0000FF) - B1) * n) + B1)).toString(16).slice(1);
        }
    }
    static shadeBlendInt(percent, color1, color2) {
        var color1Str = this.intToHexString(color1);
        var color2Str = undefined;
        if (color2) {
            color2Str = this.intToHexString(color2);
        }
        return this.hexStringToInt(this.shadeBlend(percent, color1Str, color2Str));
    }
}
Array.prototype.first = function () {
    if (this.length) {
        return this[0];
    }
    else {
        return null;
    }
};
Array.prototype.second = function () {
    if (this.length > 1) {
        return this[1];
    }
    else {
        return null;
    }
};
Array.prototype.last = function () {
    if (this.length) {
        return this[this.length - 1];
    }
    else {
        return null;
    }
};
Array.prototype.secondLast = function () {
    if (this.length > 1) {
        return this[this.length - 2];
    }
    else {
        return null;
    }
};
Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index > -1) {
        return this.splice(index, 1);
    }
    else {
        return this;
    }
};
Array.prototype.shuffle = function (random) {
    var a = this;
    for (let i = a.length; i; i--) {
        let j = Math.floor(random.go() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
};
Array.prototype.pickRandom = function (random) {
    return this[random.next(0, this.length - 1)];
};
Array.prototype.contains = function (needle) {
    return this.indexOf(needle) > -1;
};
Array.prototype.onlyOdd = function () {
    return this.filter(Numbers.isOdd);
};
Array.prototype.onlyEven = function () {
    return this.filter(Numbers.isEven);
};
Array.prototype.insert = function (obj, index) {
    return this.splice(index, 0, obj);
};
Object.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this));
};
String.prototype.repeat = function (times) {
    return (new Array(times + 1)).join(this);
};
class Geometry {
    static IsPointInCircle(circleLocation, circleRadius, point) {
        return Math.pow((point.x - circleLocation.x), 2) + Math.pow((point.y - circleLocation.y), 2) <= Math.pow(circleRadius, 2);
    }
    static IsAdjacent(point1, point2) {
        return Math.abs(point2.x - point1.x) === 1 && Math.abs(point2.y - point1.y) === 1;
    }
    static PointCanSeePoint(point1, point2, layer) {
        var initialStart = point1.clone();
        var initialEnd = point2.clone();
        var point1Clone = point1.clone();
        var point2Clone = point2.clone();
        var dx = Math.abs(point2Clone.x - point1Clone.x);
        var dy = Math.abs(point2Clone.y - point1Clone.y);
        var sx = (point1Clone.x < point2Clone.x) ? 1 : -1;
        var sy = (point1Clone.y < point2Clone.y) ? 1 : -1;
        var err = dx - dy;
        while (true) {
            if ((point1Clone.x === initialStart.x && point1Clone.y === initialStart.y) === false && (point1Clone.x === initialEnd.x && point1Clone.y === initialEnd.y) === false) {
                var objectHit = layer.tiles[point1Clone.y][point1Clone.x];
                if (objectHit !== null && objectHit instanceof Actor && objectHit.blocksSight) {
                    return false;
                }
            }
            if ((point1Clone.x == point2Clone.x) && (point1Clone.y == point2Clone.y))
                break;
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                point1Clone.x += sx;
            }
            if (e2 < dx) {
                err += dx;
                point1Clone.y += sy;
            }
        }
        return true;
    }
    static getBrightnessFromDistance(distanceAway, maxViewDistance, maxReturnValue) {
        return Math.max(0, -Math.pow((distanceAway / maxViewDistance), 2) + maxReturnValue);
    }
    static getBrightnessForPoint(point, lightsource, maxViewDistance, maxReturnValue) {
        return this.getBrightnessFromDistance(Math.hypot(point.x - lightsource.x, point.y - lightsource.y), maxViewDistance, maxReturnValue);
    }
}
class Movement {
    static ControlArrowToDirection(control) {
        if (control == Control.UpArrow) {
            return Direction.Up;
        }
        if (control == Control.DownArrow) {
            return Direction.Down;
        }
        if (control == Control.LeftArrow) {
            return Direction.Left;
        }
        if (control == Control.RightArrow) {
            return Direction.Right;
        }
    }
    static DirectionToOffset(direction) {
        if (direction == Direction.Up) {
            return new Point(0, -1);
        }
        if (direction == Direction.Down) {
            return new Point(0, 1);
        }
        if (direction == Direction.Left) {
            return new Point(-1, 0);
        }
        if (direction == Direction.Right) {
            return new Point(1, 0);
        }
        if (direction == Direction.UpLeft) {
            return new Point(-1, -1);
        }
        if (direction == Direction.UpRight) {
            return new Point(1, -1);
        }
        if (direction == Direction.DownLeft) {
            return new Point(-1, 1);
        }
        if (direction == Direction.DownRight) {
            return new Point(1, 1);
        }
    }
    static AdjacentPointsToDirection(point1, point2) {
        var x = point2.x - point1.x;
        var y = point2.y - point1.y;
        if (x == 0 && y == 1) {
            return Direction.Down;
        }
        if (x == 0 && y == -1) {
            return Direction.Up;
        }
        if (x == 1 && y == 0) {
            return Direction.Right;
        }
        if (x == -1 && y == 0) {
            return Direction.Left;
        }
        if (x == 1 && y == 1) {
            return Direction.DownRight;
        }
        if (x == -1 && y == 1) {
            return Direction.DownLeft;
        }
        if (x == 1 && y == -1) {
            return Direction.UpRight;
        }
        if (x == -1 && y == -1) {
            return Direction.UpLeft;
        }
    }
    ;
    static AddPoints(point1, point2) {
        return new Point(point1.x + point2.x, point1.y + point2.y);
    }
    static doMove(actor, layer, desiredLocation) {
        layer.destroyTile(actor.location.x, actor.location.y);
        layer.placeActor(actor, new Point(desiredLocation.x, desiredLocation.y));
        return true;
    }
    static TryMove(actor, layer, desiredLocation) {
        var movingInto = layer.getTile(desiredLocation.x, desiredLocation.y);
        if (movingInto === null) {
            return this.doMove(actor, layer, desiredLocation);
        }
        else {
            if (movingInto instanceof Chest) {
                movingInto.pickedUpBy(actor);
                return false;
            }
            if (movingInto instanceof WorldItem) {
                movingInto.pickedUpBy(actor);
                return this.doMove(actor, layer, desiredLocation);
            }
            return false;
        }
    }
}
class Numbers {
    static roundToOdd(i) {
        return 2 * Math.floor(i / 2) + 1;
    }
    static isNumber(obj) {
        return obj !== undefined && typeof (obj) === 'number' && !isNaN(obj);
    }
    static isOdd(obj) {
        return Numbers.isNumber(obj) && obj % 2;
    }
    static isEven(obj) {
        return Numbers.isNumber(obj) && !(obj % 2);
    }
}
class Random {
    constructor(seed) {
        this.seed = seed;
    }
    go() {
        let x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
    next(min, max) {
        return Math.floor(this.go() * (max - min)) + min;
    }
    nextWeighted(min, max) {
        return (Math.floor(this.go() * (max / 2)) + min) + (Math.floor(this.go() * (max / 2)) + min);
    }
}
class Rendering {
    static SliceLayersToSize(game, layers, centerPoint, width, height) {
        var slicedLayers = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var slicedLayer = new Layer(width, height, layer.zIndex, layer.name, layer.type);
            var trimmedXToWrite = 0;
            var trimmedYToWrite = 0;
            var topPosition = centerPoint.y - Math.floor(height / 2);
            var bottomPosition = centerPoint.y + Math.ceil(height / 2);
            var leftPosition = centerPoint.x - Math.floor(width / 2);
            var rightPosition = centerPoint.x + Math.ceil(width / 2);
            for (var y = topPosition; y < bottomPosition; y++) {
                for (var x = leftPosition; x < rightPosition; x++) {
                    if (x >= 0 && x < layer.width && y >= 0 && y < layer.height) {
                        slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, layer.getTile(x, y));
                    }
                    else {
                        slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, new OutOfBounds(game));
                    }
                    trimmedXToWrite++;
                }
                trimmedXToWrite = 0;
                trimmedYToWrite++;
            }
            slicedLayers.push(slicedLayer);
        }
        return slicedLayers;
    }
    static fogSprite(sprite, fogged, fogStyle) {
        if (fogStyle === FogStyle.Hide) {
            sprite.visible = !fogged;
        }
        if (fogStyle === FogStyle.Darken) {
            sprite.tint = fogged ? 0x555555 : 0xFFFFFF;
        }
    }
    static darkenSpriteByDistanceFromLightSource(sprite, spriteActor, lightSourceActor) {
        var darkColor = 0x222222;
        if (spriteActor !== null && lightSourceActor !== null && spriteActor.location !== null && lightSourceActor.location !== null) {
            var currentTint = sprite.tint;
            var darkenAmount = 1 - Geometry.getBrightnessForPoint(spriteActor.location, lightSourceActor.location, lightSourceActor.viewRadius, 1);
            var newTint = Color.shadeBlendInt(darkenAmount, currentTint, darkColor);
            sprite.tint = newTint;
        }
    }
}
class GenerationHelpers {
    static canPlace(room, rooms, totalWidth, totalHeight) {
        if (room.left() < 1 || room.right() > totalWidth - 1 || room.top() < 1 || room.bottom() > totalHeight - 1) {
            return false;
        }
        for (var i = 0; i < rooms.length; i++) {
            var otherRoom = rooms[i];
            if (Room.Intersects(room, otherRoom)) {
                return false;
            }
        }
        return true;
    }
    static carveRoom(room, wallLayer, floorLayer, floorActorType, gameReference) {
        for (var y = room.top(); y < room.bottom(); y++) {
            for (var x = room.left(); x < room.right(); x++) {
                wallLayer.placeActor(null, new Point(x, y));
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));
            }
        }
    }
    static carveHallway(room1, room2, wallLayer, floorLayer, floorActorType, minHallThickness, maxHallThickness, random, gameReference) {
        var prevCenter = room1.getCenter();
        var newCenter = room2.getCenter();
        var hallThickness = Numbers.roundToOdd(random.next(minHallThickness, maxHallThickness));
        var horizontalFirst = random.next(0, 2);
        if (horizontalFirst) {
            this.carveHorizontalHallway(prevCenter.x, newCenter.x, prevCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
            this.carveVerticalHallway(prevCenter.y, newCenter.y, newCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
        }
        else {
            this.carveVerticalHallway(prevCenter.y, newCenter.y, prevCenter.x, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
            this.carveHorizontalHallway(prevCenter.x, newCenter.x, newCenter.y, hallThickness, wallLayer, floorLayer, floorActorType, gameReference);
        }
    }
    static carveHorizontalHallway(x1, x2, y, thickness, wallLayer, floorLayer, floorActorType, gameReference) {
        var bulk = thickness == 1 ? 0 : (thickness - 1) / 2;
        for (var x = Math.min(x1, x2); x < Math.max(x1, x2) + 1 + bulk; x++) {
            if (thickness == 1) {
                wallLayer.placeActor(null, new Point(x, y));
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));
            }
            else {
                for (var o = bulk; o > -bulk; o--) {
                    wallLayer.placeActor(null, new Point(x, y + o));
                    var actor = new floorActorType(gameReference);
                    floorLayer.placeActor(actor, new Point(x, y + o));
                }
            }
        }
    }
    static carveVerticalHallway(y1, y2, x, thickness, wallLayer, floorLayer, floorActorType, gameReference) {
        var bulk = thickness == 1 ? 0 : (thickness - 1) / 2;
        for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
            if (thickness == 1) {
                wallLayer.placeActor(null, new Point(x, y));
                var actor = new floorActorType(gameReference);
                floorLayer.placeActor(actor, new Point(x, y));
            }
            else {
                for (var o = bulk; o > -bulk; o--) {
                    wallLayer.placeActor(null, new Point(x + o, y));
                    var actor = new floorActorType(gameReference);
                    floorLayer.placeActor(actor, new Point(x + o, y));
                }
            }
        }
    }
}
class WorldDecoratorSettings {
    constructor() {
        this.minNumberOfChests = 0;
        this.maxNumberOfChests = 2;
        this.minNumberOfChestContents = 1;
        this.maxNumberOfChestContents = 3;
    }
}
class WorldDecorator {
    constructor(settings, seed) {
        this.settings = settings;
        this.random = new Random(seed);
    }
    decorate(world) {
        this.setAjdacentActorStatuses(world, LayerType.Wall, Wall);
        this.decorateAllRooms(world);
        this.setAjdacentActorStatuses(world, LayerType.FloorDecor, Carpet);
    }
    setAjdacentActorStatuses(world, layerType, actorType) {
        var layer = world.getLayersOfType(layerType).first();
        if (layer !== undefined && layer !== null) {
            for (var y = 0; y < layer.tiles.length; y++) {
                for (var x = 0; x < layer.tiles[y].length; x++) {
                    var tile = layer.getTile(x, y);
                    if (tile instanceof actorType) {
                        tile.facing = WorldDecoratorHelpers.getTileAdjacencyBitmask(layer, tile.location, actorType);
                    }
                }
            }
        }
    }
    decorateAllRooms(world) {
        var rooms = world.rooms.shuffle(this.random);
        for (var r = 0; r < rooms.length; r++) {
            this.decorateRoom(world, rooms[r]);
        }
    }
    decorateRoom(world, room) {
        var roomType = Enumeration.GetRandomEnumValue(RoomDecorationType, this.random);
        var wallLayer = world.getLayersOfType(LayerType.Wall).first();
        var floorDecorLayer = world.getLayersOfType(LayerType.FloorDecor).first();
        if (roomType === RoomDecorationType.Nothing) {
        }
        else if (roomType === RoomDecorationType.Atrium) {
            var orientation = Enumeration.GetRandomEnumValue(Orientation, this.random);
            WorldDecoratorHelpers.decorateDownWalls(world.game, wallLayer, room, 1, Pillar, orientation);
        }
        else if (roomType === RoomDecorationType.Library) {
            var carpetPadding = this.random.next(1, (Math.min(room.height, room.width) / 2) - 1);
            WorldDecoratorHelpers.decorateWithCenteredRectangle(world.game, floorDecorLayer, room, carpetPadding, Carpet);
            var orientation = Enumeration.GetRandomEnumValue(Orientation, this.random);
            WorldDecoratorHelpers.decorateDownWalls(world.game, wallLayer, room, 0, Bookshelf, orientation);
        }
    }
}
class WorldDecoratorHelpers {
    static getTileAdjacencyBitmask(layer, tileLocation, adjacentType) {
        var up = tileLocation.y > 0 && layer.getTile(tileLocation.x, tileLocation.y - 1) instanceof adjacentType ? 1 : 0;
        var down = tileLocation.y < layer.tiles.length - 1 && layer.getTile(tileLocation.x, tileLocation.y + 1) instanceof adjacentType ? 4 : 0;
        var left = tileLocation.x > 0 && layer.getTile(tileLocation.x - 1, tileLocation.y) instanceof adjacentType ? 8 : 0;
        var right = tileLocation.x < layer.tiles[tileLocation.y].length - 1 && layer.getTile(tileLocation.x + 1, tileLocation.y) instanceof adjacentType ? 2 : 0;
        return up + down + left + right;
    }
    static decorateDownWalls(game, layer, room, padding, actorType, orientation) {
        if (orientation === Orientation.Vertical) {
            var leftX = padding;
            var rightX = room.width - (padding + 1);
            for (var y = (padding > 0 ? padding : 1); y + (padding > 0 ? padding : 1) < room.height; y += (padding + 1)) {
                var leftLocation = room.position.offsetBy(leftX, y);
                if (layer.getTile(leftLocation.x, leftLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(leftLocation.x - 1, leftLocation.y) instanceof Wall)) {
                        layer.placeActor(new actorType(game), leftLocation);
                    }
                }
                var rightLocation = room.position.offsetBy(rightX, y);
                if (layer.getTile(rightLocation.x, rightLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(rightLocation.x + 1, rightLocation.y) instanceof Wall)) {
                        layer.placeActor(new actorType(game), rightLocation);
                    }
                }
            }
        }
        else if (orientation === Orientation.Horizontal) {
            var topY = padding;
            var bottomY = room.height - (padding + 1);
            for (var x = (padding > 0 ? padding : 1); x + (padding > 0 ? padding : 1) < room.width; x += (padding + 1)) {
                var topLocation = room.position.offsetBy(x, topY);
                if (layer.getTile(topLocation.x, topLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(topLocation.x, topLocation.y - 1) instanceof Wall)) {
                        layer.placeActor(new actorType(game), topLocation);
                    }
                }
                var bottomLocation = room.position.offsetBy(x, bottomY);
                if (layer.getTile(bottomLocation.x, bottomLocation.y) === null) {
                    if (padding > 0 || (layer.getTile(bottomLocation.x, bottomLocation.y + 1) instanceof Wall)) {
                        layer.placeActor(new actorType(game), bottomLocation);
                    }
                }
            }
        }
    }
    static decorateWithCenteredRectangle(game, layer, room, padding, actorType) {
        for (var y = padding; y < room.height - padding; y++) {
            for (var x = padding; x < room.width - padding; x++) {
                var location = Movement.AddPoints(room.position, new Point(x, y));
                if (layer.getTile(location.x, location.y) === null) {
                    layer.placeActor(new actorType(game), location);
                }
            }
        }
    }
}
class WorldGeneratorSettings {
    constructor() {
        this.totalWidth = 0;
        this.totalHeight = 0;
        this.minRoomWidth = 0;
        this.maxRoomWidth = 0;
        this.minRoomHeight = 0;
        this.maxRoomHeight = 0;
        this.minNumRooms = 0;
        this.maxNumRooms = 0;
        this.minHallThickness = 0;
        this.maxHallThickness = 0;
        this.retryAttempts = 0;
        this.floorActorType = null;
    }
}
class WorldGenerator {
    static GenerateCarvedWorld(seed, settings, game) {
        var world = new World(settings.totalWidth, settings.totalHeight, game);
        var wallLayer = new Layer(settings.totalHeight, settings.totalWidth, 0, 'Main', LayerType.Wall);
        wallLayer.fillWith(Wall, game);
        var floorLayer = new Layer(settings.totalHeight, settings.totalWidth, -2, 'Floors', LayerType.Floor);
        var floorDecorLayer = new Layer(settings.totalHeight, settings.totalWidth, -1, 'FloorDecorations', LayerType.FloorDecor);
        var rooms = [];
        var random = new Random(seed);
        var randomRoomsToPlace = random.next(settings.minNumRooms, settings.maxNumRooms);
        var failedAttempts = 0;
        var preferSquareRooms = 1;
        while (rooms.length < randomRoomsToPlace && failedAttempts < settings.retryAttempts) {
            var randomPosition = new Point(random.next(0, settings.totalWidth), random.next(0, settings.totalHeight));
            var randomWidth;
            var randomHeight;
            if (preferSquareRooms) {
                randomWidth = random.nextWeighted(settings.minRoomWidth, settings.maxRoomWidth);
                randomHeight = random.nextWeighted(settings.minRoomHeight, settings.maxRoomHeight);
            }
            else {
                randomWidth = random.next(settings.minRoomWidth, settings.maxRoomWidth);
                randomHeight = random.next(settings.minRoomHeight, settings.maxRoomHeight);
            }
            var newRoom = new Room(randomWidth, randomHeight, randomPosition);
            if (GenerationHelpers.canPlace(newRoom, rooms, settings.totalWidth, settings.totalHeight)) {
                GenerationHelpers.carveRoom(newRoom, wallLayer, floorLayer, settings.floorActorType, game);
                rooms.push(newRoom);
            }
            else {
                failedAttempts++;
                if (preferSquareRooms && failedAttempts >= settings.retryAttempts / 2) {
                    preferSquareRooms = 0;
                }
            }
        }
        var roomsOrdered = [];
        var roomBag = rooms.slice();
        var firstRoom = rooms.pickRandom(random);
        var currentRoom = firstRoom;
        function distanceFromCurrentRoom(x, y) {
            return Point.getDistanceBetweenPoints(x.getCenter(), currentRoom.getCenter()) - Point.getDistanceBetweenPoints(y.getCenter(), currentRoom.getCenter());
        }
        while (roomBag.length > 0) {
            currentRoom = roomBag.sort(distanceFromCurrentRoom).first();
            roomBag.remove(currentRoom);
            roomsOrdered.push(currentRoom);
        }
        rooms = roomsOrdered.slice();
        for (var i = 1; i < rooms.length; i++) {
            var room = rooms[i];
            var previousRoom = rooms[i - 1];
            GenerationHelpers.carveHallway(previousRoom, room, wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game);
        }
        GenerationHelpers.carveHallway(rooms.second(), rooms.secondLast(), wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game);
        world.addLayer(wallLayer);
        world.addLayer(floorDecorLayer);
        world.addLayer(floorLayer);
        world.rooms = rooms;
        return world;
    }
}
class Menu {
    constructor(pages) {
        this.navStack = [];
        this.previousSelectedOptionIndexStack = [];
        this.selectedOptionIndex = 0;
        this.pages = this.init(pages);
        this.game = null;
        this.resetNavStack();
    }
    currentPage() {
        return this.navStack[0];
    }
    currentOption() {
        return this.currentPage().options[this.selectedOptionIndex];
    }
    getPreviousPageSelectedIndex() {
        if (this.previousSelectedOptionIndexStack.length > 0) {
            return this.previousSelectedOptionIndexStack[0];
        }
        else {
            return 0;
        }
    }
    resetNavStack() {
        this.selectedOptionIndex = 0;
        this.navStack = [this.pages[0]];
        this.previousSelectedOptionIndexStack = [];
    }
    containCursor() {
        if (this.selectedOptionIndex < 0) {
            this.selectedOptionIndex = this.currentPage().options.length - 1;
        }
        else if (this.selectedOptionIndex >= this.currentPage().options.length) {
            this.selectedOptionIndex = 0;
        }
    }
    init(pages) {
        var self = this;
        for (var p = 0; p < pages.length; p++) {
            var page = pages[p];
            for (var o = 0; o < page.options.length; o++) {
                var option = page.options[o];
                option.menu = self;
            }
        }
        return pages;
    }
    linkToGame(game) {
        this.game = game;
    }
    navUp() {
        this.selectedOptionIndex--;
        this.containCursor();
    }
    navDown() {
        this.selectedOptionIndex++;
        this.containCursor();
    }
    executeCurrentOption() {
        var option = this.currentOption();
        if (option !== null) {
            option.execute();
        }
    }
    navToPage(pageId) {
        var page = this.pages.filter(function (page) { return page.id === pageId; })[0];
        this.navStack.unshift(page);
        this.previousSelectedOptionIndexStack.unshift(this.selectedOptionIndex);
        this.selectedOptionIndex = 0;
    }
    goBackAPage() {
        if (this.navStack.length > 1) {
            this.selectedOptionIndex = this.getPreviousPageSelectedIndex();
            this.navStack.shift();
            this.previousSelectedOptionIndexStack.shift();
        }
    }
}
var MainMenu = new Menu([
    {
        id: "mainmenu",
        name: "Main Menu",
        options: [
            {
                label: "Resume",
                execute: function () {
                    this.menu.game.state = GameState.Playing;
                }
            },
            {
                label: "Options...",
                execute: function () {
                    this.menu.navToPage("options");
                }
            },
            {
                label: "Start Over",
                execute: function () {
                    this.menu.navToPage("reset");
                }
            }
        ]
    },
    {
        id: "reset",
        name: "Start Over?",
        options: [
            {
                label: "No",
                execute: function () {
                    this.menu.goBackAPage();
                }
            },
            {
                label: "Yes",
                execute: function () {
                    this.menu.game.player.reset();
                    this.menu.game.setRandomDungeon();
                    this.menu.game.unpause();
                    this.menu.game.gameTick(this.menu.game);
                    this.menu.resetNavStack();
                }
            }
        ]
    },
    {
        id: "options",
        name: "Options",
        options: [
            {
                label: "Control...",
                execute: function () {
                    this.menu.navToPage("controlOptions");
                }
            },
            {
                label: "Graphics...",
                execute: function () {
                    this.menu.navToPage("graphicOptions");
                }
            },
            {
                label: function () {
                    return ((this.menu.game.settings.showHealth ? "Hide" : "Show") +
                        " health pips");
                },
                execute: function () {
                    this.menu.game.settings.showHealth = !this.menu.game
                        .settings.showHealth;
                }
            },
            {
                label: "(back)",
                execute: function () {
                    this.menu.goBackAPage();
                }
            }
        ]
    },
    {
        id: "controlOptions",
        name: "Controls",
        options: [
            {
                label: "Control Option 1",
                execute: function () { }
            },
            {
                label: "Control Option 2",
                execute: function () { }
            },
            {
                label: "Control Option 3",
                execute: function () { }
            },
            {
                label: "Control Option 4",
                execute: function () { }
            },
            {
                label: "Control Option 5",
                execute: function () { }
            },
            {
                label: "(back)",
                execute: function () {
                    this.menu.goBackAPage();
                }
            }
        ]
    },
    {
        id: "graphicOptions",
        name: "Graphics",
        options: [
            {
                label: "Graphics Option 1",
                execute: function () { }
            },
            {
                label: "Graphics Option 2",
                execute: function () { }
            },
            {
                label: "Graphics Option 3",
                execute: function () { }
            },
            {
                label: "(back)",
                execute: function () {
                    this.menu.goBackAPage();
                }
            }
        ]
    }
]);
class PixiRenderer {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.game = null;
    }
    init() {
        this.tileSize = 16;
        this.scale = 1;
        this.infoBar = {
            width: this.width * this.tileSize,
            height: 40,
        };
        this.pixelWidth = this.width * this.tileSize;
        this.pixelHeight = (this.height * this.tileSize) + this.infoBar.height;
        PIXI.RESOLUTION = this.scale;
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width * this.tileSize * this.scale, ((this.height * this.tileSize) + this.infoBar.height) * this.scale, { backgroundColor: 0x000000 });
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();
        this.pixiStage.interactive = true;
        this.healthGraphics = [];
    }
    getInventoryText() {
        var text = '';
        var inv = this.game.player.inventory.map(function (inv) { return inv.name; });
        var itemCounts = [];
        var counts = inv.reduce((countMap, word) => { countMap[word] = ++countMap[word] || 1; return countMap; }, {});
        for (var item in counts) {
            if (counts.hasOwnProperty(item)) {
                itemCounts.push(item + ' x ' + counts[item]);
            }
        }
        return itemCounts.join(', ');
    }
    drawMenu(menu) {
        var breadcrumb = menu.navStack.map(function (page) { return page.name; }).reverse().join(' / ');
        var text = '';
        text += breadcrumb + '\r\n';
        text += '-'.repeat(breadcrumb.length) + '\r\n';
        var page = menu.currentPage();
        for (var o = 0; o < page.options.length; o++) {
            var option = page.options[o];
            var label;
            if (typeof option.label == 'function')
                label = option.label();
            else
                label = option.label;
            if (menu.selectedOptionIndex === o) {
                text += '->' + label;
            }
            else {
                text += '  ' + label;
            }
            text += '\r\n';
        }
        var style = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 11,
            fill: 0xFFFFFF,
            wordWrap: true,
            wordWrapWidth: 440
        });
        var menuText = new PIXI.Text(text, style);
        menuText.anchor.set(0.5, 0.5);
        menuText.x = this.pixiRenderer.width / 2;
        menuText.y = this.pixiRenderer.height / 2;
        var pauseOverlay = new PIXI.Graphics();
        pauseOverlay.beginFill(0x000000, 0.5);
        pauseOverlay.drawRect(0, 0, this.pixelWidth, this.pixelHeight);
        pauseOverlay.endFill();
        this.pixiStage.addChild(pauseOverlay);
        this.pixiStage.addChild(menuText);
    }
    drawInfoBar() {
        var writeLocation = new Point(0, this.height * this.tileSize);
        var text = 'Health: ' + this.game.player.health + ' | Kills: ' + this.game.player.runStats.kills + '\r\n'
            + this.game.getLastLog() + '\r\n'
            + 'Inventory:' + this.getInventoryText();
        var style = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 11,
            fill: 0xFFFFFF,
        });
        var pixiText = new PIXI.Text(text, style);
        pixiText.x = writeLocation.x;
        pixiText.y = writeLocation.y;
        this.pixiStage.addChild(pixiText);
    }
    getHealthGraphic(actor, x, y) {
        if (actor.health !== undefined) {
            var heartPipWidth = 3;
            var heartPipHeight = 3;
            var spacingBetweenPips = 3;
            var pipsToDraw = actor.health;
            var totalHeight = heartPipHeight;
            var totalWidth = (pipsToDraw * heartPipWidth) + ((pipsToDraw - 1) * spacingBetweenPips);
            x += (this.tileSize / 2);
            x -= totalWidth / 2;
            y -= 5;
            var healthGraphic = new PIXI.Graphics();
            for (var i = 0; i < pipsToDraw; i++) {
                healthGraphic.beginFill(0xff0800, 1);
                healthGraphic.drawRect(x, y, heartPipWidth, heartPipHeight);
                healthGraphic.endFill();
                x += heartPipWidth + spacingBetweenPips;
            }
            return healthGraphic;
        }
        return null;
    }
    drawHealth() {
        for (var i = 0; i < this.healthGraphics.length; i++) {
            this.pixiStage.addChild(this.healthGraphics[i]);
        }
        this.healthGraphics = [];
    }
    drawFrame(world, centerPoint) {
        for (var i = this.pixiStage.children.length - 1; i >= 0; i--) {
            this.pixiStage.removeChild(this.pixiStage.children[i]);
        }
        ;
        var layersToRender = Rendering.SliceLayersToSize(this.game, world.layers, centerPoint, this.width, this.height);
        layersToRender = layersToRender.sort(function (layer1, layer2) { return layer1.zIndex - layer2.zIndex; });
        for (var l = 0; l < layersToRender.length; l++) {
            var layer = layersToRender[l];
            var layerContainer = new PIXI.Container();
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (layer.getTile(x, y) !== undefined && layer.getTile(x, y) !== null) {
                        var actor = layer.getTile(x, y);
                        var actorSprite = actor.getSprite();
                        if (actorSprite !== null) {
                            var atlas = null;
                            if (actor instanceof Player || actor instanceof Chaser) {
                                atlas = PIXI.loader.resources.characterAtlas.textures;
                            }
                            else if (actor instanceof Wall) {
                                atlas = PIXI.loader.resources.wallsAtlas.textures;
                            }
                            else if (actor instanceof Carpet) {
                                atlas = PIXI.loader.resources.carpetAtlas.textures;
                            }
                            else {
                                atlas = PIXI.loader.resources.terrainAtlas.textures;
                            }
                            var sprite = new PIXI.Sprite(atlas[actorSprite.spriteName]);
                            sprite.x = 0 + (x * this.tileSize);
                            sprite.y = 0 + (y * this.tileSize);
                            Rendering.fogSprite(sprite, actor.fogged, actor.fogStyle);
                            Rendering.darkenSpriteByDistanceFromLightSource(sprite, actor, world.game.player);
                            layerContainer.addChild(sprite);
                            if (this.game.settings.showHealth && !actor.fogged && actor.health !== undefined) {
                                this.healthGraphics.push(this.getHealthGraphic(actor, x * this.tileSize, y * this.tileSize));
                            }
                        }
                    }
                }
            }
            this.pixiStage.addChild(layerContainer);
        }
        this.drawInfoBar();
        this.drawHealth();
        if (this.game.state === GameState.Paused) {
            this.drawMenu(this.game.menu);
        }
        this.pixiStage.scale.x = this.scale;
        this.pixiStage.scale.y = this.scale;
        this.pixiRenderer.render(this.pixiStage);
    }
}
class TextRenderer {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
    }
    init() {
    }
    drawFrame(world, centerPoint) {
        while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
        }
        var layersToRender = Rendering.SliceLayersToSize(this.game, world.layers, centerPoint, this.width, this.height);
        for (var l = 0; l < layersToRender.length; l++) {
            var layer = layersToRender[l];
            var textArea = document.createElement("textarea");
            textArea.style.width = "100%";
            textArea.style.height = "100%";
            textArea.style.fontFamily = "monospace";
            textArea.style.lineHeight = '0.65';
            textArea.style.background = 'transparent';
            textArea.style.position = 'absolute';
            textArea.style.left = '0';
            textArea.style.top = '0';
            textArea.style.zIndex = layer.zIndex;
            textArea.style.overflowY = 'hidden';
            textArea.style.fontSize = '35px';
            var text = '';
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (layer.getTile(x, y) !== undefined && layer.getTile(x, y) !== null) {
                        var actor = layer.getTile(x, y);
                        text += actor.getSprite().character;
                    }
                    else {
                        text += ' ';
                    }
                }
                text += '\r\n';
            }
            textArea.value = text;
            if (layer.type == LayerType.Wall) {
                textArea.style.color = '#494A4A';
            }
            if (layer.type == LayerType.Floor) {
                textArea.style.color = '#1C1C1C';
            }
            this.canvas.appendChild(textArea);
        }
    }
}
class Sprite {
    constructor(spriteName, character) {
        this.visible = true;
        this.spriteName = spriteName;
        this.character = character;
    }
}
class SpriteSet {
    constructor(status, direction, sprites, animationLoopStyle, frameWaitDuration) {
        this.currentFrame = 0;
        this.waitFramesUntilNextFrame = 0;
        this.playDirection = Direction.Right;
        this.restart = false;
        if (!frameWaitDuration) {
            frameWaitDuration = GameDefault.FrameWaitDuration;
        }
        this.status = status;
        this.direction = direction;
        this.sprites = sprites;
        this.animationLoopStyle = animationLoopStyle;
        this.frameWaitDuration = frameWaitDuration;
    }
    reset() {
        this.waitFramesUntilNextFrame = 0;
        this.currentFrame = 0;
        this.restart = false;
    }
    getSprite(restart) {
        this.restart = restart !== undefined && restart === true;
        if (this.animationLoopStyle === AnimationLoopStyle.Static) {
            return this.sprites.first();
        }
        if (this.animationLoopStyle === AnimationLoopStyle.Once) {
            this.waitFramesUntilNextFrame--;
            if (this.waitFramesUntilNextFrame <= 0) {
                if (this.currentFrame < this.sprites.length - 1) {
                    this.currentFrame++;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                }
                if (this.restart)
                    this.currentFrame = 0;
            }
            return this.sprites[this.currentFrame];
        }
        if (this.animationLoopStyle === AnimationLoopStyle.Loop) {
            this.waitFramesUntilNextFrame--;
            if (this.waitFramesUntilNextFrame <= 0) {
                this.currentFrame++;
                this.waitFramesUntilNextFrame = this.frameWaitDuration;
                if (this.currentFrame >= this.sprites.length) {
                    this.currentFrame = 0;
                }
            }
            if (this.restart)
                this.reset();
            return this.sprites[this.currentFrame];
        }
        if (this.animationLoopStyle === AnimationLoopStyle.PingPong) {
            this.waitFramesUntilNextFrame--;
            if (this.waitFramesUntilNextFrame <= 0) {
                if (this.playDirection === Direction.Right) {
                    this.currentFrame++;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                    if (this.currentFrame = this.sprites.length) {
                        this.currentFrame--;
                        this.playDirection = Direction.Left;
                    }
                }
                else if (this.playDirection === Direction.Left) {
                    this.currentFrame--;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                    if (this.currentFrame < 0) {
                        this.currentFrame++;
                        this.playDirection = Direction.Right;
                    }
                }
            }
            if (this.restart && this.playDirection === Direction.Right)
                this.reset();
            if (this.restart && this.playDirection === Direction.Left)
                this.currentFrame = this.sprites.length - 1;
            return this.sprites[this.currentFrame];
        }
    }
}
//# sourceMappingURL=game.js.map