// Bitmasks of
//     1
//  8  0  2
//     4
const Directions = {
    None            :  0,
    Up              :  1,
    Right           :  2,
    UpRight         :  3,
    Down            :  4,
    UpDown          :  5,
    DownRight       :  6,
    UpDownRight     :  7,
    Left            :  8,
    UpLeft          :  9,
    LeftRight       :  10,
    UpLeftRight     :  11,
    DownLeft        :  12,
    UpDownLeft      :  13,
    DownLeftRight   :  14,
    UpDownLeftRight :  15
};

const SizeCategory = {
    Tiny    : 'Tiny',
    Small   : 'Small',
    Medium  : 'Medium',
    Large   : 'Large',
    Huge    : 'Huge'
};

const LayerType = {
    Wall      : 'Wall',
    Floor     : 'Floor'
};

const Controls = {
    UpArrow     : 'UpArrow',
    DownArrow   : 'DownArrow',
    LeftArrow   : 'LeftArrow',
    RightArrow  : 'RightArrow',
    Space       : 'Space',
    Enter       : 'Enter',
    Backspace   : 'Backspace',
    Escape      : 'Escape'
};

const ExecutionType = {
    WaitAndThenExecute  : 'WaitAndThenExecute',
    ExecuteAndThenWait  : 'ExecuteAndThenWait'
};

const PathfinderTile = {
    Walkable    : 0,
    Unwalkable  : 1
};

const ActorStatus = {
    Idle        :  'Idle',
    Moving      :  'Moving',
    Attacking   :  'Attacking',

    Open        :   'Open',
    Closed      :   'Closed'
};

const GameState = {
  NotStarted    : 'NotStarted',
  Playing       : 'Playing',
  Paused        : 'Paused'
};

const FogStyle = {
    Hide    :   'Hide',
    Darken  :   'Darken'
};

const AnimationLoopStyle = {
    Static      :   'Static',
    Loop        :   'Loop',
    Once        :   'Once',
    PingPong    :   'PingPong'
};

const GameDefaults = {
    FramesPerSecond   : 30,
    FrameWaitDuration : 15,
    TicksPerSecond    : 20
};
