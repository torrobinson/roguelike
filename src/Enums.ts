// Bitmasks of
//     1
//  8  0  2
//     4
enum Direction {
    None = 0,
    Up = 1,
    Right = 2,
    UpRight = 3,
    Down = 4,
    UpDown = 5,
    DownRight = 6,
    UpDownRight = 7,
    Left = 8,
    UpLeft = 9,
    LeftRight = 10,
    UpLeftRight = 11,
    DownLeft = 12,
    UpDownLeft = 13,
    DownLeftRight = 14,
    UpDownLeftRight = 15
}

enum LightColorCode {
    White = 0xffedb2, // red shifted white
    Black = 0x121723 // blue shifted black
}

enum ColorCode {
    White = 0xFFFFFF,
    Black = 0x000000,
    Red = 0xFF0000,
    DarkRed = 0x820000,
    Green = 0x00FF00
}

enum EquipPoint {
    None,
    Head,
    Torso,
    Legs,
    Hands,
    Feet,
    Weapon
}

enum Corner {
    TopLeft = 0,
    TopRight = 1,
    BottomLeft = 2,
    BottomRight = 3
}

// Areas of rooms and their category
enum SizeCategory {
    Tiny = 36,
    Small = 81,
    Medium = 100,
    Large = 200,
    Huge = 9999
}

enum RoomDecorationType {
    Nothing = 0, // Do not decorate
    Atrium = 1,	 // Room with columns down the left and right sides
    Library = 2  // Room with bookshelves down the side walls
}

enum LayerType {
    Wall = 1,
    FloorDecor = 2,
    Floor = 3
}

enum Control {
    UpArrow = 38,
    DownArrow = 40,
    LeftArrow = 37,
    RightArrow = 39,
    Space = 32,
    Enter = 13,
    Backspace = 8,
    Escape = 27,
    P = 80,
    I = 73
}

enum ExecutionType {
    WaitAndThenExecute = 0,
    ExecuteAndThenWait = 1
}

enum PathfinderTile {
    Walkable = 0,
    Unwalkable = 1
}

enum ActorStatus {
    Idle = 0,
    Moving = 1,
    Attacking = 2,

    Open = 3,
    Closed = 4
}

enum GameState {
    NotStarted = 0,
    Playing = 1,
    Paused = 2
}

enum FogStyle {
    Hide = 0,
    Darken = 1
}

enum AnimationLoopStyle {
    Static = 0,
    Loop = 1,
    Once = 2,
    PingPong = 3,
    RandomStatic = 4
}

enum GameDefault {
    FramesPerSecond = 30,
    FrameWaitDuration = 15,
    TicksPerSecond = 20
}

enum Orientation {
    Horizontal = 0,
    Vertical = 1
}

class Enumeration {
    // Picks a random property from an object or "enum"
    static GetRandomEnumValue(obj: any, random: Random) {
        var result;
        var count = 0;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && parseInt(prop) != NaN) { //ensure it's not inherited
                if (random.go() < 1 / ++count) {
                    result = prop;
                }
            }
        }
        return parseInt(result);
    }

    static GetEnumValuesAsArray(obj: any): number[] {
        return Object.keys(obj).filter(key => !isNaN(Number(obj[key]))).select(key => Number(key));
    }
}
