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

// Areas of rooms and their category
const SizeCategory = {
    Tiny    : 36,
    Small   : 81,
    Medium  : 100,
    Large   : 200,
    Huge    : 9999
};

const RoomDecorationTypes = {
	Nothing		: 'Nothing', // Do not decorate
	Atrium		: 'Atrium',	 // Room with columns down the left and right sides
  Library   : 'Library'  // Room with bookshelves down the side walls
};

const LayerType = {
    Wall      : 'Wall',
    Floor     : 'Floor'
};

const Controls = {
    UpArrow     : 38,
    DownArrow   : 40,
    LeftArrow   : 37,
    RightArrow  : 39,
    Space       : 32,
    Enter       : 13,
    Backspace   : 8,
    Escape      : 27,
    P           : 80
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

const Orientations = {
    Horizontal  : 'Horizontal',
    Vertical    : 'Vertical'
};

class Enumeration{
  // Picks a random property from an object or "enum"
  static GetRandomEnumValue(obj, random) {
      var result;
      var count = 0;
      for (var prop in obj)
          if (random.go() < 1/++count)
             result = prop;
      return result;
  }
}
