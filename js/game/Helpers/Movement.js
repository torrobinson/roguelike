Movement = function(){};

Movement.ControlArrowToDirection = function(control){
  if(control == Enums.Controls.UpArrow){
    return Enums.Directions.Up;
  }
  if(control == Enums.Controls.DownArrow){
    return Enums.Directions.Down;
  }
  if(control == Enums.Controls.LeftArrow){
    return Enums.Directions.Left;
  }
  if(control == Enums.Controls.RightArrow){
    return Enums.Directions.Right;
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

Movement.AddPoints = function(point1,point2){
  return new Point(point1.x+point2.x, point1.y+point2.y);
};

Movement.TryMove = function(actor, layer, desiredLocation){
    // If nothing is there, then move
    if(layer.getTile(desiredLocation.x,desiredLocation.y)===null){

      // Remove it from the current location
      layer.setTile(actor.location.x, actor.location.y, null);

      // Drop it in the new location
      layer.setTile(desiredLocation.x, desiredLocation.y, actor);

      // Update the actor's location
      actor.location = desiredLocation;

      // We moved
      return true;
    }
    // Else, collide
    else{
      return false;
    }
};
