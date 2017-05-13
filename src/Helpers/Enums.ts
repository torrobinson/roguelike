import { Random } from 'src/Helpers/Random'

export namespace Enums {

    // Bitmasks of
    //     1
    //  8  0  2
    //     4
    export enum Direction {
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

    // Areas of rooms and their category
    export enum SizeCategory {
        Tiny = 36,
        Small = 81,
        Medium = 100,
        Large = 200,
        Huge = 9999
    }

    export enum RoomDecorationType {
        Nothing = 0, // Do not decorate
        Atrium = 1,	 // Room with columns down the left and right sides
        Library = 2  // Room with bookshelves down the side walls
    }

    export enum LayerType {
        Wall = 1,
        FloorDecor = 2,
        Floor = 3
    }

    export enum Control {
        UpArrow = 38,
        DownArrow = 40,
        LeftArrow = 37,
        RightArrow = 39,
        Space = 32,
        Enter = 13,
        Backspace = 8,
        Escape = 27,
        P = 80
    }

    export enum ExecutionType {
        WaitAndThenExecute = 0,
        ExecuteAndThenWait = 1
    }

    export enum PathfinderTile {
        Walkable = 0,
        Unwalkable = 1
    }

    export enum ActorStatus {
        Idle = 0,
        Moving = 1,
        Attacking = 2,

        Open = 3,
        Closed = 4
    }

    export enum GameState {
        NotStarted = 0,
        Playing = 1,
        Paused = 2
    }

    export enum FogStyle {
        Hide = 0,
        Darken = 1
    }

    export enum AnimationLoopStyle {
        Static = 0,
        Loop = 1,
        Once = 2,
        PingPong = 3
    }

    export enum GameDefault {
        FramesPerSecond = 30,
        FrameWaitDuration = 15,
        TicksPerSecond = 20
    }

    export enum Orientation {
        Horizontal = 0,
        Vertical = 1
    }

    export class Enumeration {
        // Picks a random property from an object or "enum"
        static GetRandomEnumValue(obj: any, random: Random) {
            var result;
            var count = 0;
            for (var prop in obj)
                if (random.go() < 1 / ++count)
                    result = prop;
            return result;
        }
    }

}
