class Movement{
  static ControlArrowToDirection(control){
    if(control == Controls.UpArrow){
      return Directions.Up;
    }
    if(control == Controls.DownArrow){
      return Directions.Down;
    }
    if(control == Controls.LeftArrow){
      return Directions.Left;
    }
    if(control == Controls.RightArrow){
      return Directions.Right;
    }
  }

  static DirectionToOffset(direction){
    if(direction == Directions.Up){
      return new Point(0,-1);
    }
    if(direction == Directions.Down){
      return new Point(0,1);
    }
    if(direction == Directions.Left){
      return new Point(-1,0);
    }
    if(direction == Directions.Right){
      return new Point(1,0);
    }
    if(direction == Directions.UpLeft){
      return new Point(-1,-1);
    }
    if(direction == Directions.UpRight){
      return new Point(1,-1);
    }
    if(direction == Directions.DownLeft){
      return new Point(-1,1);
    }
    if(direction == Directions.DownRight){
      return new Point(1,1);
    }
  }

  static AddPoints(point1,point2){
    return new Point(point1.x+point2.x, point1.y+point2.y);
  }

  static TryMove(actor, layer, desiredLocation){
      // If nothing is there, then move
      if(layer.getTile(desiredLocation.x,desiredLocation.y)===null){

        // Remove it from the current location
        layer.placeActor(null, new Point(actor.location.x, actor.location.y));

        // Drop it in the new location
        layer.placeActor(actor, new Point(desiredLocation.x, desiredLocation.y));

        // We moved
        return true;
      }
      // Else, collide
      else{
        return false;
      }
  }
}
