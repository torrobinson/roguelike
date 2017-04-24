Movement = function(){};

Movement.ControlArrowToDirection = function(control){
  if(control == Enums.Controls.UpArrow){
    return Enum.Directions.Up;
  }
  if(control == Enums.Controls.DownArrow){
    return Enum.Directions.Down;
  }
  if(control == Enums.Controls.LeftArrow){
    return Enum.Directions.Left;
  }
  if(control == Enums.Controls.RightArrow){
    return Enum.Directions.Right;
  }
};

Movement.DirectionToOffset = function(direction){
  if(direction == Enums.Directions.Up){
    return new Point(0,-1);
  }
  if(direction == Enums.Directions.Down){
    return new Point(0,1);
  }
  if(direction == Enums.Directions.Left){
    return new Point(-1,0);
  }
  if(direction == Enums.Directions.Right){
    return new Point(1,0);
  }
  if(direction == Enums.Directions.UpLeft){
    return new Point(-1,-1);
  }
  if(direction == Enums.Directions.UpRight){
    return new Point(1,-1);
  }
  if(direction == Enums.Directions.DownLeft){
    return new Point(-1,1);
  }
  if(direction == Enums.Directions.DownRight){
    return new Point(1,1);
  }
};
