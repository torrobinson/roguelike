System.register("Helpers/Random", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Random;
    return {
        setters: [],
        execute: function () {
            Random = class Random {
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
            };
            exports_1("Random", Random);
        }
    };
});
System.register("Helpers/Enums", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Enums;
    return {
        setters: [],
        execute: function () {
            (function (Enums) {
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
                })(Direction = Enums.Direction || (Enums.Direction = {}));
                var SizeCategory;
                (function (SizeCategory) {
                    SizeCategory[SizeCategory["Tiny"] = 36] = "Tiny";
                    SizeCategory[SizeCategory["Small"] = 81] = "Small";
                    SizeCategory[SizeCategory["Medium"] = 100] = "Medium";
                    SizeCategory[SizeCategory["Large"] = 200] = "Large";
                    SizeCategory[SizeCategory["Huge"] = 9999] = "Huge";
                })(SizeCategory = Enums.SizeCategory || (Enums.SizeCategory = {}));
                var RoomDecorationType;
                (function (RoomDecorationType) {
                    RoomDecorationType[RoomDecorationType["Nothing"] = 0] = "Nothing";
                    RoomDecorationType[RoomDecorationType["Atrium"] = 1] = "Atrium";
                    RoomDecorationType[RoomDecorationType["Library"] = 2] = "Library";
                })(RoomDecorationType = Enums.RoomDecorationType || (Enums.RoomDecorationType = {}));
                var LayerType;
                (function (LayerType) {
                    LayerType[LayerType["Wall"] = 1] = "Wall";
                    LayerType[LayerType["FloorDecor"] = 2] = "FloorDecor";
                    LayerType[LayerType["Floor"] = 3] = "Floor";
                })(LayerType = Enums.LayerType || (Enums.LayerType = {}));
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
                })(Control = Enums.Control || (Enums.Control = {}));
                var ExecutionType;
                (function (ExecutionType) {
                    ExecutionType[ExecutionType["WaitAndThenExecute"] = 0] = "WaitAndThenExecute";
                    ExecutionType[ExecutionType["ExecuteAndThenWait"] = 1] = "ExecuteAndThenWait";
                })(ExecutionType = Enums.ExecutionType || (Enums.ExecutionType = {}));
                var PathfinderTile;
                (function (PathfinderTile) {
                    PathfinderTile[PathfinderTile["Walkable"] = 0] = "Walkable";
                    PathfinderTile[PathfinderTile["Unwalkable"] = 1] = "Unwalkable";
                })(PathfinderTile = Enums.PathfinderTile || (Enums.PathfinderTile = {}));
                var ActorStatus;
                (function (ActorStatus) {
                    ActorStatus[ActorStatus["Idle"] = 0] = "Idle";
                    ActorStatus[ActorStatus["Moving"] = 1] = "Moving";
                    ActorStatus[ActorStatus["Attacking"] = 2] = "Attacking";
                    ActorStatus[ActorStatus["Open"] = 3] = "Open";
                    ActorStatus[ActorStatus["Closed"] = 4] = "Closed";
                })(ActorStatus = Enums.ActorStatus || (Enums.ActorStatus = {}));
                var GameState;
                (function (GameState) {
                    GameState[GameState["NotStarted"] = 0] = "NotStarted";
                    GameState[GameState["Playing"] = 1] = "Playing";
                    GameState[GameState["Paused"] = 2] = "Paused";
                })(GameState = Enums.GameState || (Enums.GameState = {}));
                var FogStyle;
                (function (FogStyle) {
                    FogStyle[FogStyle["Hide"] = 0] = "Hide";
                    FogStyle[FogStyle["Darken"] = 1] = "Darken";
                })(FogStyle = Enums.FogStyle || (Enums.FogStyle = {}));
                var AnimationLoopStyle;
                (function (AnimationLoopStyle) {
                    AnimationLoopStyle[AnimationLoopStyle["Static"] = 0] = "Static";
                    AnimationLoopStyle[AnimationLoopStyle["Loop"] = 1] = "Loop";
                    AnimationLoopStyle[AnimationLoopStyle["Once"] = 2] = "Once";
                    AnimationLoopStyle[AnimationLoopStyle["PingPong"] = 3] = "PingPong";
                })(AnimationLoopStyle = Enums.AnimationLoopStyle || (Enums.AnimationLoopStyle = {}));
                var GameDefault;
                (function (GameDefault) {
                    GameDefault[GameDefault["FramesPerSecond"] = 30] = "FramesPerSecond";
                    GameDefault[GameDefault["FrameWaitDuration"] = 15] = "FrameWaitDuration";
                    GameDefault[GameDefault["TicksPerSecond"] = 20] = "TicksPerSecond";
                })(GameDefault = Enums.GameDefault || (Enums.GameDefault = {}));
                var Orientation;
                (function (Orientation) {
                    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
                    Orientation[Orientation["Vertical"] = 1] = "Vertical";
                })(Orientation = Enums.Orientation || (Enums.Orientation = {}));
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
                Enums.Enumeration = Enumeration;
            })(Enums || (Enums = {}));
            exports_2("Enums", Enums);
        }
    };
});
System.register("Point", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Point;
    return {
        setters: [],
        execute: function () {
            Point = class Point {
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
            };
            exports_3("Point", Point);
        }
    };
});
System.register("Room", ["Point", "Helpers/Enums"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Point_1, Enums_1, Room;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (Enums_1_1) {
                Enums_1 = Enums_1_1;
            }
        ],
        execute: function () {
            Room = class Room {
                constructor(width, height, position) {
                    this.width = width;
                    this.height = height;
                    this.position = position;
                }
                getArea() {
                    return this.width * this.height;
                }
                getCenter() {
                    return new Point_1.Point(Math.floor((this.left() + this.right()) / 2), Math.floor((this.top() + this.bottom()) / 2));
                }
                getSizeCategory() {
                    var area = this.getArea();
                    if (area < Enums_1.Enums.SizeCategory.Tiny)
                        return Enums_1.Enums.SizeCategory.Tiny;
                    else if (area < Enums_1.Enums.SizeCategory.Small)
                        return Enums_1.Enums.SizeCategory.Small;
                    else if (area < Enums_1.Enums.SizeCategory.Medium)
                        return Enums_1.Enums.SizeCategory.Medium;
                    else if (area < Enums_1.Enums.SizeCategory.Large)
                        return Enums_1.Enums.SizeCategory.Large;
                    else
                        return Enums_1.Enums.SizeCategory.Huge;
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
                    return new Point_1.Point(this.position.x, this.position.y);
                }
                topRight() {
                    return new Point_1.Point(this.position.x + this.width, this.position.y);
                }
                bottomLeft() {
                    return new Point_1.Point(this.position.x, this.position.y + this.height);
                }
                bottomRight() {
                    return new Point_1.Point(this.position.x + this.width, this.position.y + this.height);
                }
                static Intersects(a, b) {
                    return (a.left() <= b.right() &&
                        b.left() <= a.right() &&
                        a.top() <= b.bottom() &&
                        b.top() <= a.bottom());
                }
            };
            exports_4("Room", Room);
        }
    };
});
System.register("Helpers/Geometry", ["Actors/Actor"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Actor_1, Geometry;
    return {
        setters: [
            function (Actor_1_1) {
                Actor_1 = Actor_1_1;
            }
        ],
        execute: function () {
            Geometry = class Geometry {
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
                            if (objectHit !== null && objectHit instanceof Actor_1.Actor && objectHit.blocksSight) {
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
            };
            exports_5("Geometry", Geometry);
        }
    };
});
System.register("Actors/Inventory/Base/InventoryItem", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var InventoryItem;
    return {
        setters: [],
        execute: function () {
            InventoryItem = class InventoryItem {
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
            };
            exports_6("InventoryItem", InventoryItem);
        }
    };
});
System.register("Actors/Behaviour/Action", ["Helpers/Enums"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Enums_2, Action;
    return {
        setters: [
            function (Enums_2_1) {
                Enums_2 = Enums_2_1;
            }
        ],
        execute: function () {
            Action = class Action {
                constructor(command) {
                    this.tickDuration = 1;
                    this.executionType = Enums_2.Enums.ExecutionType.WaitAndThenExecute;
                    this.command = command;
                }
                getActor() {
                    return this.command.actor;
                }
                execute() {
                }
            };
            exports_7("Action", Action);
        }
    };
});
System.register("Actors/Behaviour/Command", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Command;
    return {
        setters: [],
        execute: function () {
            Command = class Command {
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
            };
            exports_8("Command", Command);
        }
    };
});
System.register("Actors/Sprites/Sprite", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Sprite;
    return {
        setters: [],
        execute: function () {
            Sprite = class Sprite {
                constructor(spriteName, character) {
                    this.visible = true;
                    this.spriteName = spriteName;
                    this.character = character;
                }
            };
            exports_9("Sprite", Sprite);
        }
    };
});
System.register("Actors/Sprites/SpriteSet", ["Helpers/Enums"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Enums_3, SpriteSet;
    return {
        setters: [
            function (Enums_3_1) {
                Enums_3 = Enums_3_1;
            }
        ],
        execute: function () {
            SpriteSet = class SpriteSet {
                constructor(status, direction, sprites, animationLoopStyle, frameWaitDuration) {
                    this.currentFrame = 0;
                    this.waitFramesUntilNextFrame = 0;
                    this.playDirection = Enums_3.Enums.Direction.Right;
                    this.restart = false;
                    if (!frameWaitDuration) {
                        frameWaitDuration = Enums_3.Enums.GameDefault.FrameWaitDuration;
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
                    if (this.animationLoopStyle === Enums_3.Enums.AnimationLoopStyle.Static) {
                        return this.sprites.first();
                    }
                    if (this.animationLoopStyle === Enums_3.Enums.AnimationLoopStyle.Once) {
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
                    if (this.animationLoopStyle === Enums_3.Enums.AnimationLoopStyle.Loop) {
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
                    if (this.animationLoopStyle === Enums_3.Enums.AnimationLoopStyle.PingPong) {
                        this.waitFramesUntilNextFrame--;
                        if (this.waitFramesUntilNextFrame <= 0) {
                            if (this.playDirection === Enums_3.Enums.Direction.Right) {
                                this.currentFrame++;
                                this.waitFramesUntilNextFrame = this.frameWaitDuration;
                                if (this.currentFrame = this.sprites.length) {
                                    this.currentFrame--;
                                    this.playDirection = Enums_3.Enums.Direction.Left;
                                }
                            }
                            else if (this.playDirection === Enums_3.Enums.Direction.Left) {
                                this.currentFrame--;
                                this.waitFramesUntilNextFrame = this.frameWaitDuration;
                                if (this.currentFrame < 0) {
                                    this.currentFrame++;
                                    this.playDirection = Enums_3.Enums.Direction.Right;
                                }
                            }
                        }
                        if (this.restart && this.playDirection === Enums_3.Enums.Direction.Right)
                            this.reset();
                        if (this.restart && this.playDirection === Enums_3.Enums.Direction.Left)
                            this.currentFrame = this.sprites.length - 1;
                        return this.sprites[this.currentFrame];
                    }
                }
            };
            exports_10("SpriteSet", SpriteSet);
        }
    };
});
System.register("Actors/WorldItems/Base/WorldItem", ["Actors/Actor"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var Actor_2, WorldItem;
    return {
        setters: [
            function (Actor_2_1) {
                Actor_2 = Actor_2_1;
            }
        ],
        execute: function () {
            WorldItem = class WorldItem extends Actor_2.Actor {
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
            };
            exports_11("WorldItem", WorldItem);
        }
    };
});
System.register("Actors/Sprites/WorldItems/ChestSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var Enums_4, Sprite_1, SpriteSet_1, ChestSprites;
    return {
        setters: [
            function (Enums_4_1) {
                Enums_4 = Enums_4_1;
            },
            function (Sprite_1_1) {
                Sprite_1 = Sprite_1_1;
            },
            function (SpriteSet_1_1) {
                SpriteSet_1 = SpriteSet_1_1;
            }
        ],
        execute: function () {
            exports_12("ChestSprites", ChestSprites = [
                new SpriteSet_1.SpriteSet(Enums_4.Enums.ActorStatus.Closed, Enums_4.Enums.Direction.Down, [
                    new Sprite_1.Sprite('ChestClosedDown', ' ')
                ], Enums_4.Enums.AnimationLoopStyle.Static, 0),
                new SpriteSet_1.SpriteSet(Enums_4.Enums.ActorStatus.Open, Enums_4.Enums.Direction.Down, [
                    new Sprite_1.Sprite('ChestOpenDown', ' ')
                ], Enums_4.Enums.AnimationLoopStyle.Static, 0),
            ]);
        }
    };
});
System.register("Actors/WorldItems/Chest", ["Helpers/Enums", "Actors/Sprites/WorldItems/ChestSprites", "Actors/WorldItems/Base/WorldItem"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var Enums_5, ChestSprites_1, WorldItem_1, Chest;
    return {
        setters: [
            function (Enums_5_1) {
                Enums_5 = Enums_5_1;
            },
            function (ChestSprites_1_1) {
                ChestSprites_1 = ChestSprites_1_1;
            },
            function (WorldItem_1_1) {
                WorldItem_1 = WorldItem_1_1;
            }
        ],
        execute: function () {
            Chest = class Chest extends WorldItem_1.WorldItem {
                constructor(game, contents) {
                    if (!contents) {
                        var contents = [];
                    }
                    super(game);
                    this.spritesets = ChestSprites_1.ChestSprites;
                    this.contents = contents;
                    this.inventoryItem = null;
                    this.status = Enums_5.Enums.ActorStatus.Closed;
                }
                openedBy(actor) {
                    if (this.status === Enums_5.Enums.ActorStatus.Closed) {
                        for (var i = 0; i < this.contents.length; i++) {
                            var item = this.contents[i];
                            actor.obtainInventoryItem(item);
                        }
                        this.contents = null;
                        this.status = Enums_5.Enums.ActorStatus.Open;
                    }
                }
                pickedUpBy(actor) {
                    this.openedBy(actor);
                }
            };
            exports_13("Chest", Chest);
        }
    };
});
System.register("Helpers/Movement", ["Point", "Helpers/Enums", "Actors/WorldItems/Base/WorldItem", "Actors/WorldItems/Chest"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Point_2, Enums_6, WorldItem_2, Chest_1, Movement;
    return {
        setters: [
            function (Point_2_1) {
                Point_2 = Point_2_1;
            },
            function (Enums_6_1) {
                Enums_6 = Enums_6_1;
            },
            function (WorldItem_2_1) {
                WorldItem_2 = WorldItem_2_1;
            },
            function (Chest_1_1) {
                Chest_1 = Chest_1_1;
            }
        ],
        execute: function () {
            Movement = class Movement {
                static ControlArrowToDirection(control) {
                    if (control == Enums_6.Enums.Control.UpArrow) {
                        return Enums_6.Enums.Direction.Up;
                    }
                    if (control == Enums_6.Enums.Control.DownArrow) {
                        return Enums_6.Enums.Direction.Down;
                    }
                    if (control == Enums_6.Enums.Control.LeftArrow) {
                        return Enums_6.Enums.Direction.Left;
                    }
                    if (control == Enums_6.Enums.Control.RightArrow) {
                        return Enums_6.Enums.Direction.Right;
                    }
                }
                static DirectionToOffset(direction) {
                    if (direction == Enums_6.Enums.Direction.Up) {
                        return new Point_2.Point(0, -1);
                    }
                    if (direction == Enums_6.Enums.Direction.Down) {
                        return new Point_2.Point(0, 1);
                    }
                    if (direction == Enums_6.Enums.Direction.Left) {
                        return new Point_2.Point(-1, 0);
                    }
                    if (direction == Enums_6.Enums.Direction.Right) {
                        return new Point_2.Point(1, 0);
                    }
                    if (direction == Enums_6.Enums.Direction.UpLeft) {
                        return new Point_2.Point(-1, -1);
                    }
                    if (direction == Enums_6.Enums.Direction.UpRight) {
                        return new Point_2.Point(1, -1);
                    }
                    if (direction == Enums_6.Enums.Direction.DownLeft) {
                        return new Point_2.Point(-1, 1);
                    }
                    if (direction == Enums_6.Enums.Direction.DownRight) {
                        return new Point_2.Point(1, 1);
                    }
                }
                static AdjacentPointsToDirection(point1, point2) {
                    var x = point2.x - point1.x;
                    var y = point2.y - point1.y;
                    if (x == 0 && y == 1) {
                        return Enums_6.Enums.Direction.Down;
                    }
                    if (x == 0 && y == -1) {
                        return Enums_6.Enums.Direction.Up;
                    }
                    if (x == 1 && y == 0) {
                        return Enums_6.Enums.Direction.Right;
                    }
                    if (x == -1 && y == 0) {
                        return Enums_6.Enums.Direction.Left;
                    }
                    if (x == 1 && y == 1) {
                        return Enums_6.Enums.Direction.DownRight;
                    }
                    if (x == -1 && y == 1) {
                        return Enums_6.Enums.Direction.DownLeft;
                    }
                    if (x == 1 && y == -1) {
                        return Enums_6.Enums.Direction.UpRight;
                    }
                    if (x == -1 && y == -1) {
                        return Enums_6.Enums.Direction.UpLeft;
                    }
                }
                ;
                static AddPoints(point1, point2) {
                    return new Point_2.Point(point1.x + point2.x, point1.y + point2.y);
                }
                static doMove(actor, layer, desiredLocation) {
                    layer.destroyTile(actor.location.x, actor.location.y);
                    layer.placeActor(actor, new Point_2.Point(desiredLocation.x, desiredLocation.y));
                    return true;
                }
                static TryMove(actor, layer, desiredLocation) {
                    var movingInto = layer.getTile(desiredLocation.x, desiredLocation.y);
                    if (movingInto === null) {
                        return this.doMove(actor, layer, desiredLocation);
                    }
                    else {
                        if (movingInto instanceof Chest_1.Chest) {
                            movingInto.pickedUpBy(actor);
                            return false;
                        }
                        if (movingInto instanceof WorldItem_2.WorldItem) {
                            movingInto.pickedUpBy(actor);
                            return this.doMove(actor, layer, desiredLocation);
                        }
                        return false;
                    }
                }
            };
            exports_14("Movement", Movement);
        }
    };
});
System.register("Actors/Actor", ["Helpers/Geometry", "Helpers/Enums", "Helpers/Movement"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var Geometry_1, Enums_7, Movement_1, Actor;
    return {
        setters: [
            function (Geometry_1_1) {
                Geometry_1 = Geometry_1_1;
            },
            function (Enums_7_1) {
                Enums_7 = Enums_7_1;
            },
            function (Movement_1_1) {
                Movement_1 = Movement_1_1;
            }
        ],
        execute: function () {
            Actor = class Actor {
                constructor(game) {
                    this.facing = Enums_7.Enums.Direction.Down;
                    this.location = null;
                    this.layer = null;
                    this.commands = [];
                    this.currentCommand = null;
                    this.ticksUntilNextAction = null;
                    this.doesSubscribeToTicks = false;
                    this.moveTickDuration = 1;
                    this.spritesets = null;
                    this.name = '';
                    this.status = Enums_7.Enums.ActorStatus.Idle;
                    this.viewRadius = 5;
                    this.defaultAttackPower = 1;
                    this.inventory = [];
                    this.equippedWeapon = null;
                    this.fogged = true;
                    this.fogStyle = Enums_7.Enums.FogStyle.Hide;
                    this.blocksSight = true;
                    this.restartSpriteNextFrame = false;
                    this.startingHealth = 10;
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
                    return this.status === Enums_7.Enums.ActorStatus.Moving;
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
                    var offsetToMove = Movement_1.Movement.DirectionToOffset(direction);
                    if (this.layer !== null) {
                        var moveTo = Movement_1.Movement.AddPoints(this.location, offsetToMove);
                        var result = Movement_1.Movement.TryMove(this, this.layer, moveTo);
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
                        if (this.currentCommand.ignoreExecutionUntilNextFire === false && this.currentCommand.currentAction.executionType === Enums_7.Enums.ExecutionType.ExecuteAndThenWait) {
                            this.currentCommand.execute();
                            if (this.currentCommand !== null) {
                                this.currentCommand.ignoreExecutionUntilNextFire = true;
                            }
                        }
                    }
                    if (this.ticksUntilNextAction !== null && this.ticksUntilNextAction <= 0) {
                        if (this.currentCommand !== null) {
                            if (this.currentCommand.currentAction !== null) {
                                if (this.currentCommand.currentAction.executionType === Enums_7.Enums.ExecutionType.WaitAndThenExecute) {
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
                        this.status = Enums_7.Enums.ActorStatus.Idle;
                    }
                }
                canSeePoint(point, range) {
                    return Geometry_1.Geometry.IsPointInCircle(this.location, range, point) &&
                        Geometry_1.Geometry.PointCanSeePoint(this.location, point, this.layer);
                }
                canBeSeenByPoint(point, range) {
                    return Geometry_1.Geometry.IsPointInCircle(point, range, this.location) &&
                        Geometry_1.Geometry.PointCanSeePoint(point, this.location, this.layer);
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
            };
            exports_15("Actor", Actor);
        }
    };
});
System.register("Layer", ["Helpers/Enums", "Point"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Enums_8, Point_3, Layer;
    return {
        setters: [
            function (Enums_8_1) {
                Enums_8 = Enums_8_1;
            },
            function (Point_3_1) {
                Point_3 = Point_3_1;
            }
        ],
        execute: function () {
            Layer = class Layer {
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
                                actor.location = new Point_3.Point(x, y);
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
                                row.push(Enums_8.Enums.PathfinderTile.Walkable);
                            }
                            else {
                                row.push(Enums_8.Enums.PathfinderTile.Unwalkable);
                            }
                        }
                        grid.push(row);
                    }
                    return grid;
                }
            };
            exports_16("Layer", Layer);
        }
    };
});
System.register("World", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var World;
    return {
        setters: [],
        execute: function () {
            World = class World {
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
            };
            exports_17("World", World);
        }
    };
});
System.register("Renderers/Renderer", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Actors/Sprites/Characters/PlayerSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var Enums_9, Sprite_2, SpriteSet_2, PlayerSprites;
    return {
        setters: [
            function (Enums_9_1) {
                Enums_9 = Enums_9_1;
            },
            function (Sprite_2_1) {
                Sprite_2 = Sprite_2_1;
            },
            function (SpriteSet_2_1) {
                SpriteSet_2 = SpriteSet_2_1;
            }
        ],
        execute: function () {
            exports_19("PlayerSprites", PlayerSprites = [
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Idle, Enums_9.Enums.Direction.Up, [
                    new Sprite_2.Sprite('PlayerUp_1', '↑'),
                    new Sprite_2.Sprite('PlayerUp_2', '↑'),
                    new Sprite_2.Sprite('PlayerUp_3', '↑'),
                    new Sprite_2.Sprite('PlayerUp_2', '↑'),
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Idle, Enums_9.Enums.Direction.Down, [
                    new Sprite_2.Sprite('PlayerDown_1', '↑'),
                    new Sprite_2.Sprite('PlayerDown_2', '↑'),
                    new Sprite_2.Sprite('PlayerDown_3', '↑'),
                    new Sprite_2.Sprite('PlayerDown_2', '↑')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Idle, Enums_9.Enums.Direction.Left, [
                    new Sprite_2.Sprite('PlayerLeft_1', '↑'),
                    new Sprite_2.Sprite('PlayerLeft_2', '↑'),
                    new Sprite_2.Sprite('PlayerLeft_3', '↑'),
                    new Sprite_2.Sprite('PlayerLeft_2', '↑')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Idle, Enums_9.Enums.Direction.Right, [
                    new Sprite_2.Sprite('PlayerRight_1', '↑'),
                    new Sprite_2.Sprite('PlayerRight_2', '↑'),
                    new Sprite_2.Sprite('PlayerRight_3', '↑'),
                    new Sprite_2.Sprite('PlayerRight_2', '↑')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Moving, Enums_9.Enums.Direction.Up, [
                    new Sprite_2.Sprite('PlayerUp_1', '↑'),
                    new Sprite_2.Sprite('PlayerUp_2', '↑'),
                    new Sprite_2.Sprite('PlayerUp_3', '↑')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Moving, Enums_9.Enums.Direction.Down, [
                    new Sprite_2.Sprite('PlayerDown_1', '↓'),
                    new Sprite_2.Sprite('PlayerDown_2', '↓'),
                    new Sprite_2.Sprite('PlayerDown_3', '↓')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Moving, Enums_9.Enums.Direction.Left, [
                    new Sprite_2.Sprite('PlayerLeft_1', '←'),
                    new Sprite_2.Sprite('PlayerLeft_2', '←'),
                    new Sprite_2.Sprite('PlayerLeft_3', '←')
                ], Enums_9.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_2.SpriteSet(Enums_9.Enums.ActorStatus.Moving, Enums_9.Enums.Direction.Right, [
                    new Sprite_2.Sprite('PlayerRight_1', '→'),
                    new Sprite_2.Sprite('PlayerRight_2', '→'),
                    new Sprite_2.Sprite('PlayerRight_3', '→')
                ], Enums_9.Enums.AnimationLoopStyle.Loop)
            ]);
        }
    };
});
System.register("Actors/Character/RunStats", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var RunStats;
    return {
        setters: [],
        execute: function () {
            RunStats = class RunStats {
                constructor() {
                    this.kills = 0;
                }
            };
            exports_20("RunStats", RunStats);
        }
    };
});
System.register("Actors/Sprites/Environment/Special/StairsDownSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var Enums_10, Sprite_3, SpriteSet_3, StairsDownSprites;
    return {
        setters: [
            function (Enums_10_1) {
                Enums_10 = Enums_10_1;
            },
            function (Sprite_3_1) {
                Sprite_3 = Sprite_3_1;
            },
            function (SpriteSet_3_1) {
                SpriteSet_3 = SpriteSet_3_1;
            }
        ],
        execute: function () {
            exports_21("StairsDownSprites", StairsDownSprites = [
                new SpriteSet_3.SpriteSet(Enums_10.Enums.ActorStatus.Idle, Enums_10.Enums.Direction.Down, [
                    new Sprite_3.Sprite('LadderTopDown', '%')
                ], Enums_10.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Special/StairsDown", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/Special/StairsDownSprites"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var Actor_3, Enums_11, StairsDownSprites_1, StairsDown;
    return {
        setters: [
            function (Actor_3_1) {
                Actor_3 = Actor_3_1;
            },
            function (Enums_11_1) {
                Enums_11 = Enums_11_1;
            },
            function (StairsDownSprites_1_1) {
                StairsDownSprites_1 = StairsDownSprites_1_1;
            }
        ],
        execute: function () {
            StairsDown = class StairsDown extends Actor_3.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = StairsDownSprites_1.StairsDownSprites;
                    this.fogStyle = Enums_11.Enums.FogStyle.Hide;
                    this.blocksSight = false;
                }
            };
            exports_22("StairsDown", StairsDown);
        }
    };
});
System.register("Actors/Sprites/Characters/ChaserSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var Enums_12, Sprite_4, SpriteSet_4, ChaserSprites;
    return {
        setters: [
            function (Enums_12_1) {
                Enums_12 = Enums_12_1;
            },
            function (Sprite_4_1) {
                Sprite_4 = Sprite_4_1;
            },
            function (SpriteSet_4_1) {
                SpriteSet_4 = SpriteSet_4_1;
            }
        ],
        execute: function () {
            exports_23("ChaserSprites", ChaserSprites = [
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Moving, Enums_12.Enums.Direction.Up, [
                    new Sprite_4.Sprite('BlobUp_1', '↑'),
                    new Sprite_4.Sprite('BlobUp_2', '↑'),
                    new Sprite_4.Sprite('BlobUp_3', '↑')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Moving, Enums_12.Enums.Direction.Down, [
                    new Sprite_4.Sprite('BlobDown_1', '↓'),
                    new Sprite_4.Sprite('BlobDown_2', '↓'),
                    new Sprite_4.Sprite('BlobDown_3', '↓')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Moving, Enums_12.Enums.Direction.Left, [
                    new Sprite_4.Sprite('BlobLeft_1', '←'),
                    new Sprite_4.Sprite('BlobLeft_2', '←'),
                    new Sprite_4.Sprite('BlobLeft_3', '←')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Moving, Enums_12.Enums.Direction.Right, [
                    new Sprite_4.Sprite('BlobRight_1', '→'),
                    new Sprite_4.Sprite('BlobRight_2', '→'),
                    new Sprite_4.Sprite('BlobRight_3', '→')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Idle, Enums_12.Enums.Direction.Up, [
                    new Sprite_4.Sprite('BlobUp_2', '↑')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Idle, Enums_12.Enums.Direction.Down, [
                    new Sprite_4.Sprite('BlobDown_2', '↓')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Idle, Enums_12.Enums.Direction.Left, [
                    new Sprite_4.Sprite('BlobLeft_2', '←')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
                new SpriteSet_4.SpriteSet(Enums_12.Enums.ActorStatus.Idle, Enums_12.Enums.Direction.Right, [
                    new Sprite_4.Sprite('BlobRight_2', '→')
                ], Enums_12.Enums.AnimationLoopStyle.Loop),
            ]);
        }
    };
});
System.register("Actors/Behaviour/Actions/Move", ["Actors/Behaviour/Action", "Helpers/Enums"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var Action_1, Enums_13, Move;
    return {
        setters: [
            function (Action_1_1) {
                Action_1 = Action_1_1;
            },
            function (Enums_13_1) {
                Enums_13 = Enums_13_1;
            }
        ],
        execute: function () {
            Move = class Move extends Action_1.Action {
                constructor(command, direction) {
                    super(command);
                    this.direction = direction;
                    this.tickDuration = this.command.actor.moveTickDuration;
                    this.executionType = Enums_13.Enums.ExecutionType.ExecuteAndThenWait;
                }
                execute() {
                    super.execute();
                    this.getActor().move(this.direction);
                }
            };
            exports_24("Move", Move);
        }
    };
});
System.register("Actors/Behaviour/Commands/MoveTo", ["Point", "Actors/Behaviour/Actions/Move", "Actors/Behaviour/Command", "Helpers/Enums", "Helpers/Movement"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var Point_4, Move_1, Command_1, Enums_14, Movement_2, MoveTo;
    return {
        setters: [
            function (Point_4_1) {
                Point_4 = Point_4_1;
            },
            function (Move_1_1) {
                Move_1 = Move_1_1;
            },
            function (Command_1_1) {
                Command_1 = Command_1_1;
            },
            function (Enums_14_1) {
                Enums_14 = Enums_14_1;
            },
            function (Movement_2_1) {
                Movement_2 = Movement_2_1;
            }
        ],
        execute: function () {
            MoveTo = class MoveTo extends Command_1.Command {
                constructor(actor, endPoint, overrideStartPoint) {
                    super(actor);
                    var startPoint = actor.location;
                    if (overrideStartPoint) {
                        startPoint = overrideStartPoint;
                    }
                    if (Point_4.Point.getDistanceBetweenPoints(startPoint, endPoint) === 1) {
                        this.addAction(new Move_1.Move(this, Movement_2.Movement.AdjacentPointsToDirection(startPoint, endPoint)));
                    }
                    else {
                        var collisionGrid = this.actor.layer.getCollisionGrid(startPoint, endPoint);
                        var grid = new PF.Grid(collisionGrid.length, collisionGrid[0].length, collisionGrid);
                        var finder = new PF.AStarFinder();
                        var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, grid);
                        if (path.length > 0) {
                            for (var p = 1; p < path.length; p++) {
                                var lastStep = new Point_4.Point(path[p - 1][0], path[p - 1][1]);
                                var step = new Point_4.Point(path[p][0], path[p][1]);
                                this.addAction(new Move_1.Move(this, Movement_2.Movement.AdjacentPointsToDirection(lastStep, step)));
                            }
                        }
                    }
                }
                execute() {
                    super.execute();
                    this.actor.status = Enums_14.Enums.ActorStatus.Moving;
                }
            };
            exports_25("MoveTo", MoveTo);
        }
    };
});
System.register("Actors/Character/Chaser", ["Actors/Sprites/Characters/ChaserSprites", "Actors/Actor", "Actors/Character/Player", "Actors/Behaviour/Commands/MoveTo"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var ChaserSprites_1, Actor_4, Player_1, MoveTo_1, Chaser;
    return {
        setters: [
            function (ChaserSprites_1_1) {
                ChaserSprites_1 = ChaserSprites_1_1;
            },
            function (Actor_4_1) {
                Actor_4 = Actor_4_1;
            },
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (MoveTo_1_1) {
                MoveTo_1 = MoveTo_1_1;
            }
        ],
        execute: function () {
            Chaser = class Chaser extends Actor_4.Actor {
                constructor(game) {
                    super(game);
                    this.doesSubscribeToTicks = true;
                    this.moveTickDuration = 2;
                    this.startingHealth = 1;
                    this.viewRadius = 15;
                    this.blocksSight = false;
                    this.name = 'Blob';
                    this.spritesets = ChaserSprites_1.ChaserSprites;
                }
                collidedInto(actor) {
                    super.collidedInto(actor);
                    if (actor instanceof Player_1.Player) {
                        this.attack(actor, this.defaultAttackPower);
                    }
                }
                tick() {
                    super.tick();
                    var player = this.game.player;
                    var self = this;
                    if (self.canSeeActor(player)) {
                        var command = new MoveTo_1.MoveTo(self, player.location);
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
            };
            exports_26("Chaser", Chaser);
        }
    };
});
System.register("Actors/Character/Player", ["Actors/Actor", "Helpers/Enums", "Point", "Actors/Sprites/Characters/PlayerSprites", "Actors/Character/RunStats", "Helpers/Geometry", "Actors/Environment/Special/StairsDown", "Actors/Character/Chaser"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Actor_5, Enums_15, Point_5, PlayerSprites_1, RunStats_1, Geometry_2, StairsDown_1, Chaser_1, Player;
    return {
        setters: [
            function (Actor_5_1) {
                Actor_5 = Actor_5_1;
            },
            function (Enums_15_1) {
                Enums_15 = Enums_15_1;
            },
            function (Point_5_1) {
                Point_5 = Point_5_1;
            },
            function (PlayerSprites_1_1) {
                PlayerSprites_1 = PlayerSprites_1_1;
            },
            function (RunStats_1_1) {
                RunStats_1 = RunStats_1_1;
            },
            function (Geometry_2_1) {
                Geometry_2 = Geometry_2_1;
            },
            function (StairsDown_1_1) {
                StairsDown_1 = StairsDown_1_1;
            },
            function (Chaser_1_1) {
                Chaser_1 = Chaser_1_1;
            }
        ],
        execute: function () {
            Player = class Player extends Actor_5.Actor {
                constructor(game) {
                    super(game);
                    this.doesSubscribeToTicks = true;
                    this.moveTickDuration = 1;
                    this.viewRadius = 18;
                    this.fogged = false;
                    this.defaultAttackPower = 1;
                    this.startingHealth = 10;
                    this.name = 'You';
                    this.spritesets = PlayerSprites_1.PlayerSprites;
                    this.initStats();
                }
                move(direction) {
                    super.move(direction);
                    this.restartSpriteNextFrame = true;
                }
                initStats() {
                    this.runStats = new RunStats_1.RunStats();
                }
                reset() {
                    this.health = this.startingHealth;
                    this.clearCommands();
                    this.equippedWeapon = null;
                    this.inventory = [];
                }
                collidedInto(actor) {
                    super.collidedInto(actor);
                    if (actor instanceof StairsDown_1.StairsDown) {
                        this.game.worldStack.push(this.game.world);
                        this.game.setRandomDungeon();
                    }
                    else if (actor instanceof Chaser_1.Chaser) {
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
                        var wallLayer = this.world.getLayersOfType(Enums_15.Enums.LayerType.Wall).first();
                        var floorLayer = this.world.getLayersOfType(Enums_15.Enums.LayerType.Floor).first();
                        var floorDecorLayer = this.world.getLayersOfType(Enums_15.Enums.LayerType.FloorDecor).first();
                        for (var y = this.location.y - this.viewRadius; y < this.location.y + this.viewRadius; y++) {
                            for (var x = this.location.x - this.viewRadius; x < this.location.x + this.viewRadius; x++) {
                                if (y >= 0 && y < wallLayer.height && x >= 0 && x < wallLayer.width) {
                                    var point = new Point_5.Point(x, y);
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
                                    else if (Geometry_2.Geometry.IsPointInCircle(this.location, this.viewRadius, point)) {
                                        var surroundedWall = wallLayer.getTile(point.x, point.y);
                                        if (surroundedWall !== null
                                            && surroundedWall.fogged
                                            && (surroundedWall.facing === Enums_15.Enums.Direction.UpDownLeftRight
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
            };
            exports_27("Player", Player);
        }
    };
});
System.register("Actors/Sprites/Environment/FloorSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var Enums_16, Sprite_5, SpriteSet_5, FloorSprites;
    return {
        setters: [
            function (Enums_16_1) {
                Enums_16 = Enums_16_1;
            },
            function (Sprite_5_1) {
                Sprite_5 = Sprite_5_1;
            },
            function (SpriteSet_5_1) {
                SpriteSet_5 = SpriteSet_5_1;
            }
        ],
        execute: function () {
            exports_28("FloorSprites", FloorSprites = [
                new SpriteSet_5.SpriteSet(Enums_16.Enums.ActorStatus.Idle, Enums_16.Enums.Direction.Down, [
                    new Sprite_5.Sprite('Cobblestone4Down', '.')
                ], Enums_16.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Floor", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/FloorSprites"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var Actor_6, Enums_17, FloorSprites_1, Floor;
    return {
        setters: [
            function (Actor_6_1) {
                Actor_6 = Actor_6_1;
            },
            function (Enums_17_1) {
                Enums_17 = Enums_17_1;
            },
            function (FloorSprites_1_1) {
                FloorSprites_1 = FloorSprites_1_1;
            }
        ],
        execute: function () {
            Floor = class Floor extends Actor_6.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = FloorSprites_1.FloorSprites;
                    this.fogStyle = Enums_17.Enums.FogStyle.Darken;
                }
            };
            exports_29("Floor", Floor);
        }
    };
});
System.register("Actors/Sprites/Environment/Special/StairsUpSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var Enums_18, Sprite_6, SpriteSet_6, StairsUpSprites;
    return {
        setters: [
            function (Enums_18_1) {
                Enums_18 = Enums_18_1;
            },
            function (Sprite_6_1) {
                Sprite_6 = Sprite_6_1;
            },
            function (SpriteSet_6_1) {
                SpriteSet_6 = SpriteSet_6_1;
            }
        ],
        execute: function () {
            exports_30("StairsUpSprites", StairsUpSprites = [
                new SpriteSet_6.SpriteSet(Enums_18.Enums.ActorStatus.Idle, Enums_18.Enums.Direction.Down, [
                    new Sprite_6.Sprite('LadderBottomDown', '%')
                ], Enums_18.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Special/StairsUp", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/Special/StairsUpSprites"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var Actor_7, Enums_19, StairsUpSprites_1, StairsUp;
    return {
        setters: [
            function (Actor_7_1) {
                Actor_7 = Actor_7_1;
            },
            function (Enums_19_1) {
                Enums_19 = Enums_19_1;
            },
            function (StairsUpSprites_1_1) {
                StairsUpSprites_1 = StairsUpSprites_1_1;
            }
        ],
        execute: function () {
            StairsUp = class StairsUp extends Actor_7.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = StairsUpSprites_1.StairsUpSprites;
                    this.fogStyle = Enums_19.Enums.FogStyle.Hide;
                    this.blocksSight = false;
                }
            };
            exports_31("StairsUp", StairsUp);
        }
    };
});
System.register("Actors/Inventory/Potion", ["Actors/Inventory/Base/InventoryItem"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var InventoryItem_1, Potion;
    return {
        setters: [
            function (InventoryItem_1_1) {
                InventoryItem_1 = InventoryItem_1_1;
            }
        ],
        execute: function () {
            Potion = class Potion extends InventoryItem_1.InventoryItem {
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
            };
            exports_32("Potion", Potion);
        }
    };
});
System.register("GameSettings", [], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var GameSettings;
    return {
        setters: [],
        execute: function () {
            GameSettings = class GameSettings {
                constructor() {
                    this.showHealth = false;
                }
            };
            exports_33("GameSettings", GameSettings);
        }
    };
});
System.register("Menu/Menu", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var Menu;
    return {
        setters: [],
        execute: function () {
            Menu = class Menu {
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
            };
            exports_34("Menu", Menu);
        }
    };
});
System.register("Menu/Menus/MainMenu", ["Menu/Menu", "Helpers/Enums"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var Menu_1, Enums_20, MainMenu;
    return {
        setters: [
            function (Menu_1_1) {
                Menu_1 = Menu_1_1;
            },
            function (Enums_20_1) {
                Enums_20 = Enums_20_1;
            }
        ],
        execute: function () {
            exports_35("MainMenu", MainMenu = new Menu_1.Menu([
                {
                    id: "mainmenu",
                    name: "Main Menu",
                    options: [
                        {
                            label: "Resume",
                            execute: function () {
                                this.menu.game.state = Enums_20.Enums.GameState.Playing;
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
            ]));
        }
    };
});
System.register("Helpers/Numbers", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var Numbers;
    return {
        setters: [],
        execute: function () {
            Numbers = class Numbers {
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
            };
            exports_36("Numbers", Numbers);
        }
    };
});
System.register("Helpers/Generation/GenerationHelpers", ["Room", "Point", "Helpers/Numbers"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var Room_1, Point_6, Numbers_1, GenerationHelpers;
    return {
        setters: [
            function (Room_1_1) {
                Room_1 = Room_1_1;
            },
            function (Point_6_1) {
                Point_6 = Point_6_1;
            },
            function (Numbers_1_1) {
                Numbers_1 = Numbers_1_1;
            }
        ],
        execute: function () {
            GenerationHelpers = class GenerationHelpers {
                static canPlace(room, rooms, totalWidth, totalHeight) {
                    if (room.left() < 1 || room.right() > totalWidth - 1 || room.top() < 1 || room.bottom() > totalHeight - 1) {
                        return false;
                    }
                    for (var i = 0; i < rooms.length; i++) {
                        var otherRoom = rooms[i];
                        if (Room_1.Room.Intersects(room, otherRoom)) {
                            return false;
                        }
                    }
                    return true;
                }
                static carveRoom(room, wallLayer, floorLayer, floorActorType, gameReference) {
                    for (var y = room.top(); y < room.bottom(); y++) {
                        for (var x = room.left(); x < room.right(); x++) {
                            wallLayer.placeActor(null, new Point_6.Point(x, y));
                            var actor = new floorActorType(gameReference);
                            floorLayer.placeActor(actor, new Point_6.Point(x, y));
                        }
                    }
                }
                static carveHallway(room1, room2, wallLayer, floorLayer, floorActorType, minHallThickness, maxHallThickness, random, gameReference) {
                    var prevCenter = room1.getCenter();
                    var newCenter = room2.getCenter();
                    var hallThickness = Numbers_1.Numbers.roundToOdd(random.next(minHallThickness, maxHallThickness));
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
                            wallLayer.placeActor(null, new Point_6.Point(x, y));
                            var actor = new floorActorType(gameReference);
                            floorLayer.placeActor(actor, new Point_6.Point(x, y));
                        }
                        else {
                            for (var o = bulk; o > -bulk; o--) {
                                wallLayer.placeActor(null, new Point_6.Point(x, y + o));
                                var actor = new floorActorType(gameReference);
                                floorLayer.placeActor(actor, new Point_6.Point(x, y + o));
                            }
                        }
                    }
                }
                static carveVerticalHallway(y1, y2, x, thickness, wallLayer, floorLayer, floorActorType, gameReference) {
                    var bulk = thickness == 1 ? 0 : (thickness - 1) / 2;
                    for (var y = Math.min(y1, y2); y < Math.max(y1, y2) + 1 + bulk; y++) {
                        if (thickness == 1) {
                            wallLayer.placeActor(null, new Point_6.Point(x, y));
                            var actor = new floorActorType(gameReference);
                            floorLayer.placeActor(actor, new Point_6.Point(x, y));
                        }
                        else {
                            for (var o = bulk; o > -bulk; o--) {
                                wallLayer.placeActor(null, new Point_6.Point(x + o, y));
                                var actor = new floorActorType(gameReference);
                                floorLayer.placeActor(actor, new Point_6.Point(x + o, y));
                            }
                        }
                    }
                }
            };
            exports_37("GenerationHelpers", GenerationHelpers);
        }
    };
});
System.register("Actors/Sprites/Environment/WallSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var Enums_21, Sprite_7, SpriteSet_7, WallSprites;
    return {
        setters: [
            function (Enums_21_1) {
                Enums_21 = Enums_21_1;
            },
            function (Sprite_7_1) {
                Sprite_7 = Sprite_7_1;
            },
            function (SpriteSet_7_1) {
                SpriteSet_7 = SpriteSet_7_1;
            }
        ],
        execute: function () {
            exports_38("WallSprites", WallSprites = [
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.Up, [
                    new Sprite_7.Sprite('WallUp', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.Right, [
                    new Sprite_7.Sprite('WallRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpRight, [
                    new Sprite_7.Sprite('WallUpRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.Down, [
                    new Sprite_7.Sprite('WallDown', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpDown, [
                    new Sprite_7.Sprite('WallUpDown', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.DownRight, [
                    new Sprite_7.Sprite('WallDownRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpDownRight, [
                    new Sprite_7.Sprite('WallUpDownRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.Left, [
                    new Sprite_7.Sprite('WallLeft', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpLeft, [
                    new Sprite_7.Sprite('WallUpLeft', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.LeftRight, [
                    new Sprite_7.Sprite('WallLeftRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpLeftRight, [
                    new Sprite_7.Sprite('WallUpLeftRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.DownLeft, [
                    new Sprite_7.Sprite('WallDownLeft', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpDownLeft, [
                    new Sprite_7.Sprite('WallUpDownLeft', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.DownLeftRight, [
                    new Sprite_7.Sprite('WallDownLeftRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.UpDownLeftRight, [
                    new Sprite_7.Sprite('WallUpDownLeftRight', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static),
                new SpriteSet_7.SpriteSet(Enums_21.Enums.ActorStatus.Idle, Enums_21.Enums.Direction.None, [
                    new Sprite_7.Sprite('WallNone', '#')
                ], Enums_21.Enums.AnimationLoopStyle.Static)
            ]);
        }
    };
});
System.register("Actors/Environment/Wall", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/WallSprites"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Actor_8, Enums_22, WallSprites_1, Wall;
    return {
        setters: [
            function (Actor_8_1) {
                Actor_8 = Actor_8_1;
            },
            function (Enums_22_1) {
                Enums_22 = Enums_22_1;
            },
            function (WallSprites_1_1) {
                WallSprites_1 = WallSprites_1_1;
            }
        ],
        execute: function () {
            Wall = class Wall extends Actor_8.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = WallSprites_1.WallSprites;
                    this.fogStyle = Enums_22.Enums.FogStyle.Darken;
                }
            };
            exports_39("Wall", Wall);
        }
    };
});
System.register("Helpers/Generation/WorldGenerator", ["Helpers/Random", "World", "Layer", "Room", "Point", "Helpers/Generation/GenerationHelpers", "Helpers/Enums", "Actors/Environment/Wall"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var Random_1, World_1, Layer_1, Room_2, Point_7, GenerationHelpers_1, Enums_23, Wall_1, WorldGeneratorSettings, WorldGenerator;
    return {
        setters: [
            function (Random_1_1) {
                Random_1 = Random_1_1;
            },
            function (World_1_1) {
                World_1 = World_1_1;
            },
            function (Layer_1_1) {
                Layer_1 = Layer_1_1;
            },
            function (Room_2_1) {
                Room_2 = Room_2_1;
            },
            function (Point_7_1) {
                Point_7 = Point_7_1;
            },
            function (GenerationHelpers_1_1) {
                GenerationHelpers_1 = GenerationHelpers_1_1;
            },
            function (Enums_23_1) {
                Enums_23 = Enums_23_1;
            },
            function (Wall_1_1) {
                Wall_1 = Wall_1_1;
            }
        ],
        execute: function () {
            WorldGeneratorSettings = class WorldGeneratorSettings {
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
            };
            exports_40("WorldGeneratorSettings", WorldGeneratorSettings);
            WorldGenerator = class WorldGenerator {
                static GenerateCarvedWorld(seed, settings, game) {
                    var world = new World_1.World(settings.totalWidth, settings.totalHeight, game);
                    var wallLayer = new Layer_1.Layer(settings.totalHeight, settings.totalWidth, 0, 'Main', Enums_23.Enums.LayerType.Wall);
                    wallLayer.fillWith(Wall_1.Wall, game);
                    var floorLayer = new Layer_1.Layer(settings.totalHeight, settings.totalWidth, -2, 'Floors', Enums_23.Enums.LayerType.Floor);
                    var floorDecorLayer = new Layer_1.Layer(settings.totalHeight, settings.totalWidth, -1, 'FloorDecorations', Enums_23.Enums.LayerType.FloorDecor);
                    var rooms = [];
                    var random = new Random_1.Random(seed);
                    var randomRoomsToPlace = random.next(settings.minNumRooms, settings.maxNumRooms);
                    var failedAttempts = 0;
                    var preferSquareRooms = 1;
                    while (rooms.length < randomRoomsToPlace && failedAttempts < settings.retryAttempts) {
                        var randomPosition = new Point_7.Point(random.next(0, settings.totalWidth), random.next(0, settings.totalHeight));
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
                        var newRoom = new Room_2.Room(randomWidth, randomHeight, randomPosition);
                        if (GenerationHelpers_1.GenerationHelpers.canPlace(newRoom, rooms, settings.totalWidth, settings.totalHeight)) {
                            GenerationHelpers_1.GenerationHelpers.carveRoom(newRoom, wallLayer, floorLayer, settings.floorActorType, game);
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
                        return Point_7.Point.getDistanceBetweenPoints(x.getCenter(), currentRoom.getCenter()) - Point_7.Point.getDistanceBetweenPoints(y.getCenter(), currentRoom.getCenter());
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
                        GenerationHelpers_1.GenerationHelpers.carveHallway(previousRoom, room, wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game);
                    }
                    GenerationHelpers_1.GenerationHelpers.carveHallway(rooms.second(), rooms.secondLast(), wallLayer, floorLayer, settings.floorActorType, settings.minHallThickness, settings.maxHallThickness, random, game);
                    world.addLayer(wallLayer);
                    world.addLayer(floorDecorLayer);
                    world.addLayer(floorLayer);
                    world.rooms = rooms;
                    return world;
                }
            };
            exports_40("WorldGenerator", WorldGenerator);
        }
    };
});
System.register("Helpers/Generation/WorldDecoratorHelpers", ["Point", "Actors/Environment/Wall", "Helpers/Enums", "Helpers/Movement"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var Point_8, Wall_2, Enums_24, Movement_3, WorldDecoratorHelpers;
    return {
        setters: [
            function (Point_8_1) {
                Point_8 = Point_8_1;
            },
            function (Wall_2_1) {
                Wall_2 = Wall_2_1;
            },
            function (Enums_24_1) {
                Enums_24 = Enums_24_1;
            },
            function (Movement_3_1) {
                Movement_3 = Movement_3_1;
            }
        ],
        execute: function () {
            WorldDecoratorHelpers = class WorldDecoratorHelpers {
                static getTileAdjacencyBitmask(layer, tileLocation, adjacentType) {
                    var up = tileLocation.y > 0 && layer.getTile(tileLocation.x, tileLocation.y - 1) instanceof adjacentType ? 1 : 0;
                    var down = tileLocation.y < layer.tiles.length - 1 && layer.getTile(tileLocation.x, tileLocation.y + 1) instanceof adjacentType ? 4 : 0;
                    var left = tileLocation.x > 0 && layer.getTile(tileLocation.x - 1, tileLocation.y) instanceof adjacentType ? 8 : 0;
                    var right = tileLocation.x < layer.tiles[tileLocation.y].length - 1 && layer.getTile(tileLocation.x + 1, tileLocation.y) instanceof adjacentType ? 2 : 0;
                    return up + down + left + right;
                }
                static decorateDownWalls(game, layer, room, padding, actorType, orientation) {
                    if (orientation === Enums_24.Enums.Orientation.Vertical) {
                        var leftX = padding;
                        var rightX = room.width - (padding + 1);
                        for (var y = (padding > 0 ? padding : 1); y + (padding > 0 ? padding : 1) < room.height; y += (padding + 1)) {
                            var leftLocation = room.position.offsetBy(leftX, y);
                            if (layer.getTile(leftLocation.x, leftLocation.y) === null) {
                                if (padding > 0 || (layer.getTile(leftLocation.x - 1, leftLocation.y) instanceof Wall_2.Wall)) {
                                    layer.placeActor(new actorType(game), leftLocation);
                                }
                            }
                            var rightLocation = room.position.offsetBy(rightX, y);
                            if (layer.getTile(rightLocation.x, rightLocation.y) === null) {
                                if (padding > 0 || (layer.getTile(rightLocation.x + 1, rightLocation.y) instanceof Wall_2.Wall)) {
                                    layer.placeActor(new actorType(game), rightLocation);
                                }
                            }
                        }
                    }
                    else if (orientation === Enums_24.Enums.Orientation.Horizontal) {
                        var topY = padding;
                        var bottomY = room.height - (padding + 1);
                        for (var x = (padding > 0 ? padding : 1); x + (padding > 0 ? padding : 1) < room.width; x += (padding + 1)) {
                            var topLocation = room.position.offsetBy(x, topY);
                            if (layer.getTile(topLocation.x, topLocation.y) === null) {
                                if (padding > 0 || (layer.getTile(topLocation.x, topLocation.y - 1) instanceof Wall_2.Wall)) {
                                    layer.placeActor(new actorType(game), topLocation);
                                }
                            }
                            var bottomLocation = room.position.offsetBy(x, bottomY);
                            if (layer.getTile(bottomLocation.x, bottomLocation.y) === null) {
                                if (padding > 0 || (layer.getTile(bottomLocation.x, bottomLocation.y + 1) instanceof Wall_2.Wall)) {
                                    layer.placeActor(new actorType(game), bottomLocation);
                                }
                            }
                        }
                    }
                }
                static decorateWithCenteredRectangle(game, layer, room, padding, actorType) {
                    for (var y = padding; y < room.height - padding; y++) {
                        for (var x = padding; x < room.width - padding; x++) {
                            var location = Movement_3.Movement.AddPoints(room.position, new Point_8.Point(x, y));
                            if (layer.getTile(location.x, location.y) === null) {
                                layer.placeActor(new actorType(game), location);
                            }
                        }
                    }
                }
            };
            exports_41("WorldDecoratorHelpers", WorldDecoratorHelpers);
        }
    };
});
System.register("Actors/Sprites/Environment/CarpetSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var Enums_25, Sprite_8, SpriteSet_8, CarpetSprites;
    return {
        setters: [
            function (Enums_25_1) {
                Enums_25 = Enums_25_1;
            },
            function (Sprite_8_1) {
                Sprite_8 = Sprite_8_1;
            },
            function (SpriteSet_8_1) {
                SpriteSet_8 = SpriteSet_8_1;
            }
        ],
        execute: function () {
            exports_42("CarpetSprites", CarpetSprites = [
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.Up, [
                    new Sprite_8.Sprite('CarpetUp', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.Right, [
                    new Sprite_8.Sprite('CarpetRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpRight, [
                    new Sprite_8.Sprite('CarpetUpRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.Down, [
                    new Sprite_8.Sprite('CarpetDown', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpDown, [
                    new Sprite_8.Sprite('CarpetUpDown', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.DownRight, [
                    new Sprite_8.Sprite('CarpetDownRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpDownRight, [
                    new Sprite_8.Sprite('CarpetUpDownRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.Left, [
                    new Sprite_8.Sprite('CarpetLeft', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpLeft, [
                    new Sprite_8.Sprite('CarpetUpLeft', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.LeftRight, [
                    new Sprite_8.Sprite('CarpetLeftRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpLeftRight, [
                    new Sprite_8.Sprite('CarpetUpLeftRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.DownLeft, [
                    new Sprite_8.Sprite('CarpetDownLeft', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpDownLeft, [
                    new Sprite_8.Sprite('CarpetUpDownLeft', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.DownLeftRight, [
                    new Sprite_8.Sprite('CarpetDownLeftRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.UpDownLeftRight, [
                    new Sprite_8.Sprite('CarpetUpDownLeftRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static),
                new SpriteSet_8.SpriteSet(Enums_25.Enums.ActorStatus.Idle, Enums_25.Enums.Direction.None, [
                    new Sprite_8.Sprite('CarpetUpDownLeftRight', '#')
                ], Enums_25.Enums.AnimationLoopStyle.Static)
            ]);
        }
    };
});
System.register("Actors/Environment/Carpet", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/CarpetSprites"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var Actor_9, Enums_26, CarpetSprites_1, Carpet;
    return {
        setters: [
            function (Actor_9_1) {
                Actor_9 = Actor_9_1;
            },
            function (Enums_26_1) {
                Enums_26 = Enums_26_1;
            },
            function (CarpetSprites_1_1) {
                CarpetSprites_1 = CarpetSprites_1_1;
            }
        ],
        execute: function () {
            Carpet = class Carpet extends Actor_9.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = CarpetSprites_1.CarpetSprites;
                    this.fogStyle = Enums_26.Enums.FogStyle.Darken;
                }
            };
            exports_43("Carpet", Carpet);
        }
    };
});
System.register("Actors/Sprites/Environment/BookshelfSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var Enums_27, Sprite_9, SpriteSet_9, BookshelfSprites;
    return {
        setters: [
            function (Enums_27_1) {
                Enums_27 = Enums_27_1;
            },
            function (Sprite_9_1) {
                Sprite_9 = Sprite_9_1;
            },
            function (SpriteSet_9_1) {
                SpriteSet_9 = SpriteSet_9_1;
            }
        ],
        execute: function () {
            exports_44("BookshelfSprites", BookshelfSprites = [
                new SpriteSet_9.SpriteSet(Enums_27.Enums.ActorStatus.Idle, Enums_27.Enums.Direction.Down, [
                    new Sprite_9.Sprite('BookshelfDown', 'B')
                ], Enums_27.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Bookshelf", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/BookshelfSprites"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var Actor_10, Enums_28, BookshelfSprites_1, Bookshelf;
    return {
        setters: [
            function (Actor_10_1) {
                Actor_10 = Actor_10_1;
            },
            function (Enums_28_1) {
                Enums_28 = Enums_28_1;
            },
            function (BookshelfSprites_1_1) {
                BookshelfSprites_1 = BookshelfSprites_1_1;
            }
        ],
        execute: function () {
            Bookshelf = class Bookshelf extends Actor_10.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = BookshelfSprites_1.BookshelfSprites;
                    this.fogStyle = Enums_28.Enums.FogStyle.Darken;
                    this.blocksSight = false;
                }
            };
            exports_45("Bookshelf", Bookshelf);
        }
    };
});
System.register("Actors/Sprites/Environment/PillarSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var Enums_29, Sprite_10, SpriteSet_10, PillarSprites;
    return {
        setters: [
            function (Enums_29_1) {
                Enums_29 = Enums_29_1;
            },
            function (Sprite_10_1) {
                Sprite_10 = Sprite_10_1;
            },
            function (SpriteSet_10_1) {
                SpriteSet_10 = SpriteSet_10_1;
            }
        ],
        execute: function () {
            exports_46("PillarSprites", PillarSprites = [
                new SpriteSet_10.SpriteSet(Enums_29.Enums.ActorStatus.Idle, Enums_29.Enums.Direction.Down, [
                    new Sprite_10.Sprite('PillarDown', 'P')
                ], Enums_29.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Pillar", ["Actors/Actor", "Helpers/Enums", "Actors/Sprites/Environment/PillarSprites"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var Actor_11, Enums_30, PillarSprites_1, Pillar;
    return {
        setters: [
            function (Actor_11_1) {
                Actor_11 = Actor_11_1;
            },
            function (Enums_30_1) {
                Enums_30 = Enums_30_1;
            },
            function (PillarSprites_1_1) {
                PillarSprites_1 = PillarSprites_1_1;
            }
        ],
        execute: function () {
            Pillar = class Pillar extends Actor_11.Actor {
                constructor(game) {
                    super(game);
                    this.spritesets = PillarSprites_1.PillarSprites;
                    this.fogStyle = Enums_30.Enums.FogStyle.Darken;
                    this.blocksSight = false;
                }
            };
            exports_47("Pillar", Pillar);
        }
    };
});
System.register("Helpers/Generation/WorldDecorator", ["Helpers/Generation/WorldDecoratorHelpers", "Helpers/Enums", "Helpers/Random", "Actors/Environment/Wall", "Actors/Environment/Carpet", "Actors/Environment/Bookshelf", "Actors/Environment/Pillar"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var WorldDecoratorHelpers_1, Enums_31, Random_2, Wall_3, Carpet_1, Bookshelf_1, Pillar_1, WorldDecoratorSettings, WorldDecorator;
    return {
        setters: [
            function (WorldDecoratorHelpers_1_1) {
                WorldDecoratorHelpers_1 = WorldDecoratorHelpers_1_1;
            },
            function (Enums_31_1) {
                Enums_31 = Enums_31_1;
            },
            function (Random_2_1) {
                Random_2 = Random_2_1;
            },
            function (Wall_3_1) {
                Wall_3 = Wall_3_1;
            },
            function (Carpet_1_1) {
                Carpet_1 = Carpet_1_1;
            },
            function (Bookshelf_1_1) {
                Bookshelf_1 = Bookshelf_1_1;
            },
            function (Pillar_1_1) {
                Pillar_1 = Pillar_1_1;
            }
        ],
        execute: function () {
            WorldDecoratorSettings = class WorldDecoratorSettings {
                constructor() {
                    this.minNumberOfChests = 0;
                    this.maxNumberOfChests = 2;
                    this.minNumberOfChestContents = 1;
                    this.maxNumberOfChestContents = 3;
                }
            };
            exports_48("WorldDecoratorSettings", WorldDecoratorSettings);
            WorldDecorator = class WorldDecorator {
                constructor(settings, seed) {
                    this.settings = settings;
                    this.random = new Random_2.Random(seed);
                }
                decorate(world) {
                    this.setAjdacentActorStatuses(world, Enums_31.Enums.LayerType.Wall, Wall_3.Wall);
                    this.decorateAllRooms(world);
                    this.setAjdacentActorStatuses(world, Enums_31.Enums.LayerType.FloorDecor, Carpet_1.Carpet);
                }
                setAjdacentActorStatuses(world, layerType, actorType) {
                    var layer = world.getLayersOfType(layerType).first();
                    if (layer !== undefined && layer !== null) {
                        for (var y = 0; y < layer.tiles.length; y++) {
                            for (var x = 0; x < layer.tiles[y].length; x++) {
                                var tile = layer.getTile(x, y);
                                if (tile instanceof actorType) {
                                    tile.facing = WorldDecoratorHelpers_1.WorldDecoratorHelpers.getTileAdjacencyBitmask(layer, tile.location, actorType);
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
                    var roomType = Enums_31.Enums.Enumeration.GetRandomEnumValue(Enums_31.Enums.RoomDecorationType, this.random);
                    var wallLayer = world.getLayersOfType(Enums_31.Enums.LayerType.Wall).first();
                    var floorDecorLayer = world.getLayersOfType(Enums_31.Enums.LayerType.FloorDecor).first();
                    if (roomType === Enums_31.Enums.RoomDecorationType.Nothing) {
                    }
                    else if (roomType === Enums_31.Enums.RoomDecorationType.Atrium) {
                        var orientation = Enums_31.Enums.Enumeration.GetRandomEnumValue(Enums_31.Enums.Orientation, this.random);
                        WorldDecoratorHelpers_1.WorldDecoratorHelpers.decorateDownWalls(world.game, wallLayer, room, 1, Pillar_1.Pillar, orientation);
                    }
                    else if (roomType === Enums_31.Enums.RoomDecorationType.Library) {
                        var carpetPadding = this.random.next(1, (Math.min(room.height, room.width) / 2) - 1);
                        WorldDecoratorHelpers_1.WorldDecoratorHelpers.decorateWithCenteredRectangle(world.game, floorDecorLayer, room, carpetPadding, Carpet_1.Carpet);
                        var orientation = Enums_31.Enums.Enumeration.GetRandomEnumValue(Enums_31.Enums.Orientation, this.random);
                        WorldDecoratorHelpers_1.WorldDecoratorHelpers.decorateDownWalls(world.game, wallLayer, room, 0, Bookshelf_1.Bookshelf, orientation);
                    }
                }
            };
            exports_48("WorldDecorator", WorldDecorator);
        }
    };
});
System.register("Game", ["Helpers/Enums", "Actors/Character/Player", "Actors/Character/Chaser", "Actors/Actor", "Actors/WorldItems/Chest", "Actors/Environment/Floor", "Actors/Environment/Special/StairsDown", "Actors/Environment/Special/StairsUp", "Point", "Actors/Inventory/Potion", "GameSettings", "Menu/Menus/MainMenu", "Actors/Behaviour/Commands/MoveTo", "Helpers/Movement", "Helpers/Generation/WorldGenerator", "Helpers/Generation/WorldDecorator"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var Enums_32, Player_2, Chaser_2, Actor_12, Chest_2, Floor_1, StairsDown_2, StairsUp_1, Point_9, Potion_1, GameSettings_1, MainMenu_1, MoveTo_2, Movement_4, WorldGenerator_1, WorldGenerator_2, WorldDecorator_1, WorldDecorator_2, Game;
    return {
        setters: [
            function (Enums_32_1) {
                Enums_32 = Enums_32_1;
            },
            function (Player_2_1) {
                Player_2 = Player_2_1;
            },
            function (Chaser_2_1) {
                Chaser_2 = Chaser_2_1;
            },
            function (Actor_12_1) {
                Actor_12 = Actor_12_1;
            },
            function (Chest_2_1) {
                Chest_2 = Chest_2_1;
            },
            function (Floor_1_1) {
                Floor_1 = Floor_1_1;
            },
            function (StairsDown_2_1) {
                StairsDown_2 = StairsDown_2_1;
            },
            function (StairsUp_1_1) {
                StairsUp_1 = StairsUp_1_1;
            },
            function (Point_9_1) {
                Point_9 = Point_9_1;
            },
            function (Potion_1_1) {
                Potion_1 = Potion_1_1;
            },
            function (GameSettings_1_1) {
                GameSettings_1 = GameSettings_1_1;
            },
            function (MainMenu_1_1) {
                MainMenu_1 = MainMenu_1_1;
            },
            function (MoveTo_2_1) {
                MoveTo_2 = MoveTo_2_1;
            },
            function (Movement_4_1) {
                Movement_4 = Movement_4_1;
            },
            function (WorldGenerator_1_1) {
                WorldGenerator_1 = WorldGenerator_1_1;
                WorldGenerator_2 = WorldGenerator_1_1;
            },
            function (WorldDecorator_1_1) {
                WorldDecorator_1 = WorldDecorator_1_1;
                WorldDecorator_2 = WorldDecorator_1_1;
            }
        ],
        execute: function () {
            Game = class Game {
                constructor(renderer, seed) {
                    this.renderer = renderer;
                    this.renderer.game = this;
                    this.seed = seed;
                    this.frameClock = null;
                    this.framesPerSecond = Enums_32.Enums.GameDefault.FramesPerSecond;
                    this.ticksPerSecond = Enums_32.Enums.GameDefault.TicksPerSecond;
                    this.player = new Player_2.Player(this);
                    this.world = null;
                    this.worldStack = [];
                    this.state = Enums_32.Enums.GameState.NotStarted;
                    this.settings = new GameSettings_1.GameSettings();
                    this.renderer.init();
                    this.gameLog = ['You enter the dungeon'];
                    this.startFrameTimer = (game) => {
                        game.frameClock = setInterval(() => {
                            game.frameTick(game);
                        }, (1 / game.framesPerSecond) * 1000);
                    };
                    this.menu = MainMenu_1.MainMenu;
                    this.menu.linkToGame(this);
                }
                start() {
                    this.state = Enums_32.Enums.GameState.Playing;
                    this.startFrameTimer(this);
                    this.gameTick(this);
                }
                pause() {
                    this.state = Enums_32.Enums.GameState.Paused;
                }
                unpause() {
                    this.state = Enums_32.Enums.GameState.Playing;
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
                        centerPoint = new Point_9.Point(Math.floor(game.world.width / 2), Math.floor(game.world.height / 2));
                    }
                    game.renderer.drawFrame(game.world, centerPoint);
                }
                gameTick(game) {
                    if (this.state !== Enums_32.Enums.GameState.Paused) {
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
                                    if (actor instanceof Actor_12.Actor && actor.doesSubscribeToTicks) {
                                        tickableActors.push(actor);
                                    }
                                }
                            }
                        }
                    }
                    var player = null;
                    for (var actor of tickableActors) {
                        if (actor instanceof Player_2.Player) {
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
                    if (this.state === Enums_32.Enums.GameState.Paused) {
                        if (control === Enums_32.Enums.Control.UpArrow) {
                            this.menu.navUp();
                        }
                        if (control === Enums_32.Enums.Control.DownArrow) {
                            this.menu.navDown();
                        }
                        if (control === Enums_32.Enums.Control.Enter || control === Enums_32.Enums.Control.Space) {
                            this.menu.executeCurrentOption();
                        }
                        if (control === Enums_32.Enums.Control.Backspace) {
                            this.menu.goBackAPage();
                        }
                        if (control === Enums_32.Enums.Control.Escape) {
                            this.unpause();
                            this.menu.resetNavStack();
                        }
                        return;
                    }
                    if (this.state === Enums_32.Enums.GameState.Playing) {
                        if ([Enums_32.Enums.Control.UpArrow, Enums_32.Enums.Control.DownArrow, Enums_32.Enums.Control.LeftArrow, Enums_32.Enums.Control.RightArrow].contains(control)) {
                            if (!this.player.isMoving()) {
                                var directionToMove = Movement_4.Movement.ControlArrowToDirection(control);
                                var offset = Movement_4.Movement.DirectionToOffset(directionToMove);
                                var resultLocation = Movement_4.Movement.AddPoints(this.player.location, offset);
                                this.player.addCommand(new MoveTo_2.MoveTo(this.player, resultLocation));
                            }
                            this.gameTick(this);
                        }
                        if (control === Enums_32.Enums.Control.Escape) {
                            this.pause();
                        }
                        if (control === Enums_32.Enums.Control.P) {
                            this.player.tryUseInventory(Potion_1.Potion);
                        }
                        return;
                    }
                }
                setRandomDungeon() {
                    console.log('Generating dungeon with seed "' + this.seed + '"');
                    this.seed++;
                    var settings = new WorldGenerator_2.WorldGeneratorSettings();
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
                    settings.floorActorType = Floor_1.Floor;
                    this.world = WorldGenerator_1.WorldGenerator.GenerateCarvedWorld(this.seed, settings, this);
                    var decoratorSettings = new WorldDecorator_2.WorldDecoratorSettings();
                    var decorator = new WorldDecorator_1.WorldDecorator(decoratorSettings, this.seed);
                    decorator.decorate(this.world);
                    this.player.world = this.world;
                    var mainLayer = this.world.layers.filter(function (layer) {
                        return layer.type == Enums_32.Enums.LayerType.Wall;
                    }).first();
                    var starterRoomCenter = this.world.rooms.first().getCenter();
                    var lastRoomCenter = this.world.rooms.last().getCenter();
                    var spawnLocation = new Point_9.Point(starterRoomCenter.x, starterRoomCenter.y);
                    var exitLocation = new Point_9.Point(lastRoomCenter.x, lastRoomCenter.y);
                    var stairsUp = new StairsUp_1.StairsUp(this);
                    mainLayer.placeActor(stairsUp, spawnLocation);
                    mainLayer.placeActor(this.player, Movement_4.Movement.AddPoints(spawnLocation, new Point_9.Point(0, 1)));
                    var exit = new StairsDown_2.StairsDown(this);
                    mainLayer.placeActor(exit, exitLocation);
                    var chaser = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser, exitLocation.offsetBy(1, 1));
                    var chaser2 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser2, exitLocation.offsetBy(0, 1));
                    var chaser3 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser3, exitLocation.offsetBy(1, 0));
                    var chaser4 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser4, exitLocation.offsetBy(-1, -1));
                    var chaser5 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser5, exitLocation.offsetBy(-1, 0));
                    var chaser6 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser6, exitLocation.offsetBy(0, -1));
                    var chaser7 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser7, exitLocation.offsetBy(1, -1));
                    var chaser8 = new Chaser_2.Chaser(this);
                    mainLayer.placeActor(chaser8, exitLocation.offsetBy(-1, 1));
                    var demoChest = new Chest_2.Chest(this, [new Potion_1.Potion()]);
                    mainLayer.placeActor(demoChest, this.world.rooms.second().getCenter());
                }
            };
            exports_49("Game", Game);
        }
    };
});
System.register("Actors/Sprites/Environment/Special/OutOfBoundsSprites", ["Helpers/Enums", "Actors/Sprites/Sprite", "Actors/Sprites/SpriteSet"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var Enums_33, Sprite_11, SpriteSet_11, OutOfBoundsSprites;
    return {
        setters: [
            function (Enums_33_1) {
                Enums_33 = Enums_33_1;
            },
            function (Sprite_11_1) {
                Sprite_11 = Sprite_11_1;
            },
            function (SpriteSet_11_1) {
                SpriteSet_11 = SpriteSet_11_1;
            }
        ],
        execute: function () {
            exports_50("OutOfBoundsSprites", OutOfBoundsSprites = [
                new SpriteSet_11.SpriteSet(Enums_33.Enums.ActorStatus.Idle, Enums_33.Enums.Direction.Down, [
                    new Sprite_11.Sprite('WallDarkDown', ' ')
                ], Enums_33.Enums.AnimationLoopStyle.Static),
            ]);
        }
    };
});
System.register("Actors/Environment/Special/OutOfBounds", ["Actors/Actor", "Actors/Sprites/Environment/Special/OutOfBoundsSprites"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var Actor_13, OutOfBoundsSprites_1, Environment;
    return {
        setters: [
            function (Actor_13_1) {
                Actor_13 = Actor_13_1;
            },
            function (OutOfBoundsSprites_1_1) {
                OutOfBoundsSprites_1 = OutOfBoundsSprites_1_1;
            }
        ],
        execute: function () {
            (function (Environment) {
                var Special;
                (function (Special) {
                    class OutOfBounds extends Actor_13.Actor {
                        constructor(game) {
                            super(game);
                            this.spritesets = OutOfBoundsSprites_1.OutOfBoundsSprites;
                        }
                    }
                    Special.OutOfBounds = OutOfBounds;
                })(Special = Environment.Special || (Environment.Special = {}));
            })(Environment || (Environment = {}));
            exports_51("Environment", Environment);
        }
    };
});
System.register("Helpers/Color", [], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var Color;
    return {
        setters: [],
        execute: function () {
            Color = class Color {
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
            };
            exports_52("Color", Color);
        }
    };
});
System.register("Helpers/Rendering", ["Layer", "Helpers/Enums", "Actors/Environment/Special/OutOfBounds", "Helpers/Geometry", "Helpers/Color"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var Layer_2, Enums_34, OutOfBounds_1, Geometry_3, Color_1, Rendering;
    return {
        setters: [
            function (Layer_2_1) {
                Layer_2 = Layer_2_1;
            },
            function (Enums_34_1) {
                Enums_34 = Enums_34_1;
            },
            function (OutOfBounds_1_1) {
                OutOfBounds_1 = OutOfBounds_1_1;
            },
            function (Geometry_3_1) {
                Geometry_3 = Geometry_3_1;
            },
            function (Color_1_1) {
                Color_1 = Color_1_1;
            }
        ],
        execute: function () {
            Rendering = class Rendering {
                static SliceLayersToSize(game, layers, centerPoint, width, height) {
                    var slicedLayers = [];
                    for (var i = 0; i < layers.length; i++) {
                        var layer = layers[i];
                        var slicedLayer = new Layer_2.Layer(width, height, layer.zIndex, layer.name, layer.type);
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
                                    slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, new OutOfBounds_1.Environment.Special.OutOfBounds(game));
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
                    if (fogStyle === Enums_34.Enums.FogStyle.Hide) {
                        sprite.visible = !fogged;
                    }
                    if (fogStyle === Enums_34.Enums.FogStyle.Darken) {
                        sprite.tint = fogged ? 0x555555 : 0xFFFFFF;
                    }
                }
                static darkenSpriteByDistanceFromLightSource(sprite, spriteActor, lightSourceActor) {
                    var darkColor = 0x222222;
                    if (spriteActor !== null && lightSourceActor !== null && spriteActor.location !== null && lightSourceActor.location !== null) {
                        var currentTint = sprite.tint;
                        var darkenAmount = 1 - Geometry_3.Geometry.getBrightnessForPoint(spriteActor.location, lightSourceActor.location, lightSourceActor.viewRadius, 1);
                        var newTint = Color_1.Color.shadeBlendInt(darkenAmount, currentTint, darkColor);
                        sprite.tint = newTint;
                    }
                }
            };
            exports_53("Rendering", Rendering);
        }
    };
});
System.register("Renderers/PixiRenderer", ["Point", "Helpers/Enums", "Actors/Character/Player", "Actors/Character/Chaser", "Actors/Environment/Wall", "Actors/Environment/Carpet", "Helpers/Rendering"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var Point_10, Enums_35, Player_3, Chaser_3, Wall_4, Carpet_2, Rendering_1, PixiRenderer;
    return {
        setters: [
            function (Point_10_1) {
                Point_10 = Point_10_1;
            },
            function (Enums_35_1) {
                Enums_35 = Enums_35_1;
            },
            function (Player_3_1) {
                Player_3 = Player_3_1;
            },
            function (Chaser_3_1) {
                Chaser_3 = Chaser_3_1;
            },
            function (Wall_4_1) {
                Wall_4 = Wall_4_1;
            },
            function (Carpet_2_1) {
                Carpet_2 = Carpet_2_1;
            },
            function (Rendering_1_1) {
                Rendering_1 = Rendering_1_1;
            }
        ],
        execute: function () {
            PixiRenderer = class PixiRenderer {
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
                    this.textures.terrainAtlas = PIXI.loader.resources['terrainAtlas'].textures;
                    this.textures.characterAtlas = PIXI.loader.resources['characterAtlas'].textures;
                    this.textures.wallsAtlas = PIXI.loader.resources['wallsAtlas'].textures;
                    this.textures.carpetAtlas = PIXI.loader.resources['carpetAtlas'].textures;
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
                    var writeLocation = new Point_10.Point(0, this.height * this.tileSize);
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
                    var layersToRender = Rendering_1.Rendering.SliceLayersToSize(this.game, world.layers, centerPoint, this.width, this.height);
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
                                        if (actor instanceof Player_3.Player || actor instanceof Chaser_3.Chaser) {
                                            atlas = this.textures.characterAtlas;
                                        }
                                        else if (actor instanceof Wall_4.Wall) {
                                            atlas = this.textures.wallsAtlas;
                                        }
                                        else if (actor instanceof Carpet_2.Carpet) {
                                            atlas = this.textures.carpetAtlas;
                                        }
                                        else {
                                            atlas = this.textures.terrainAtlas;
                                        }
                                        var sprite = new PIXI.Sprite(atlas[actorSprite.spriteName]);
                                        sprite.x = 0 + (x * this.tileSize);
                                        sprite.y = 0 + (y * this.tileSize);
                                        Rendering_1.Rendering.fogSprite(sprite, actor.fogged, actor.fogStyle);
                                        Rendering_1.Rendering.darkenSpriteByDistanceFromLightSource(sprite, actor, world.game.player);
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
                    if (this.game.state === Enums_35.Enums.GameState.Paused) {
                        this.drawMenu(this.game.menu);
                    }
                    this.pixiStage.scale.x = this.scale;
                    this.pixiStage.scale.y = this.scale;
                    this.pixiRenderer.render(this.pixiStage);
                }
            };
            exports_54("PixiRenderer", PixiRenderer);
        }
    };
});
System.register("GameClient", ["Renderers/PixiRenderer", "Game"], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    var PixiRenderer_1, Game_1;
    return {
        setters: [
            function (PixiRenderer_1_1) {
                PixiRenderer_1 = PixiRenderer_1_1;
            },
            function (Game_1_1) {
                Game_1 = Game_1_1;
            }
        ],
        execute: function () {
            ;
            document.addEventListener("DOMContentLoaded", function (event) {
                PIXI.loader
                    .add('terrainAtlas', 'art/rogueliketiles.json')
                    .add('characterAtlas', 'art/characters_1.json')
                    .add('wallsAtlas', 'art/walls.json')
                    .add('carpetAtlas', 'art/dungeoncarpet.json')
                    .load(setupGame);
                function setupGame() {
                    var time = (new Date).getTime();
                    var seed;
                    var seedInQS = getUrlParameter('seed');
                    if (seedInQS !== '') {
                        seed = seedInQS;
                    }
                    else {
                        history.pushState({}, '', window.location.href + '?seed=' + time);
                        seed = time.toString();
                    }
                    var canvas = document.getElementById('canvas');
                    var renderer = new PixiRenderer_1.PixiRenderer(canvas, 40, 30);
                    if (seed.match(/[a-z]/i)) {
                        var string = seed;
                        seed = '';
                        for (var i = 0; i < string.length; i++) {
                            seed += string.charCodeAt(i);
                        }
                    }
                    var game = new Game_1.Game(renderer, parseInt(seed));
                    game.setRandomDungeon();
                    game.start();
                    document.onkeydown = keyDown;
                    document.onkeyup = keyUp;
                    var isKeyRepeating = false;
                    var keyRepeatTimer = null;
                    var keyRepeatRate = 25;
                    function keyUp(e) {
                        if (keyRepeatTimer !== null) {
                            clearTimeout(keyRepeatTimer);
                            keyRepeatTimer = null;
                        }
                        isKeyRepeating = false;
                    }
                    function keyDown(e) {
                        e.preventDefault();
                        if (isKeyRepeating) {
                            if (keyRepeatTimer == null) {
                                keyRepeatTimer = setTimeout(function () {
                                    isKeyRepeating = false;
                                    clearTimeout(keyRepeatTimer);
                                    keyRepeatTimer = null;
                                }, keyRepeatRate);
                            }
                        }
                        else {
                            isKeyRepeating = true;
                            e = e || window.event;
                            game.controlPressed(e.keyCode);
                        }
                    }
                }
            });
        }
    };
});
System.register("Helpers/Extensions", ["Helpers/Numbers"], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var Numbers_2;
    return {
        setters: [
            function (Numbers_2_1) {
                Numbers_2 = Numbers_2_1;
            }
        ],
        execute: function () {
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
                return this.filter(Numbers_2.Numbers.isOdd);
            };
            Array.prototype.onlyEven = function () {
                return this.filter(Numbers_2.Numbers.isEven);
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
        }
    };
});
System.register("Renderers/TextRenderer", ["Helpers/Rendering", "Helpers/Enums"], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var Rendering_2, Enums_36, TextRenderer;
    return {
        setters: [
            function (Rendering_2_1) {
                Rendering_2 = Rendering_2_1;
            },
            function (Enums_36_1) {
                Enums_36 = Enums_36_1;
            }
        ],
        execute: function () {
            TextRenderer = class TextRenderer {
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
                    var layersToRender = Rendering_2.Rendering.SliceLayersToSize(this.game, world.layers, centerPoint, this.width, this.height);
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
                        if (layer.type == Enums_36.Enums.LayerType.Wall) {
                            textArea.style.color = '#494A4A';
                        }
                        if (layer.type == Enums_36.Enums.LayerType.Floor) {
                            textArea.style.color = '#1C1C1C';
                        }
                        this.canvas.appendChild(textArea);
                    }
                }
            };
            exports_57("TextRenderer", TextRenderer);
        }
    };
});
//# sourceMappingURL=game.js.map