const Directions = {
    Up          : 'Up',
    Down        : 'Down',
    Left        : 'Left',
    Right       : 'Right',
    UpRight     : 'UpRight',
    UpLeft      : 'UpLeft',
    DownLeft    : 'DownLeft',
    DownRight   : 'DownRight'
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
