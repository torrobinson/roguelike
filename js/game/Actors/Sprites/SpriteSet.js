// A Sprite Set represents a set of sprites (or frames) representing an actor in a given status and facing a given direction.
// Its animationLoopStyle defines how, if at all, it animates
class SpriteSet{
  constructor(status, direction, sprites, animationLoopStyle, frameWaitDuration){
    if(animationLoopStyle === undefined){
      var animationLoopStyle = AnimationLoopStyle.Static;
    }
    if(frameWaitDuration === undefined || frameWaitDuration < 0){
      var frameWaitDuration = GameDefaults.FrameWaitDuration;
    }
    // Given an actor's status and direction
    this.status = status;
    this.direction = direction;

    // Play these sprites
    this.sprites = sprites;
    this.animationLoopStyle = animationLoopStyle;
    this.frameWaitDuration = frameWaitDuration;

    // Play status
    this.currentFrame = 0;
    this.waitFramesUntilNextFrame = 0;
    this.playDirection = Directions.Right;
    this.restart = false;
  }

  reset(){
    this.waitFramesUntilNextFrame = 0;
    this.currentFrame = 0;
    this.restart = false;
  }

  getSprite(restart){
    this.restart = restart !== undefined && restart === true;

    // Static sprites are always just the first sprite/frame
    if(this.animationLoopStyle === AnimationLoopStyle.Static){
      return this.sprites.first();
    }

    // One-time animations reach their last frame and then stop
    if(this.animationLoopStyle === AnimationLoopStyle.Once){
      this.waitFramesUntilNextFrame--;
      // Advance if there's still frames to play
      if(this.waitFramesUntilNextFrame <= 0){
        if(this.currentFrame < this.sprites.length - 1){
          this.currentFrame++;
          this.waitFramesUntilNextFrame = this.frameWaitDuration;
        }

        if(this.restart) this.currentFrame = 0;
      }
      return this.sprites[this.currentFrame];
    }

    // Looping animations advance back to frame 1 when finished
    if(this.animationLoopStyle === AnimationLoopStyle.Loop){
      this.waitFramesUntilNextFrame--;
      if(this.waitFramesUntilNextFrame <= 0){
        // Advance
        this.currentFrame++;
        this.waitFramesUntilNextFrame = this.frameWaitDuration;
        // Wrap back to start if needed
        if(this.currentFrame >= this.sprites.length){
          this.currentFrame = 0;
        }
      }
      if(this.restart) this.reset();
      return this.sprites[this.currentFrame];
    }

    // Ping-pong animation play forwards, backwards, and then repeat
    if(this.animationLoopStyle === AnimationLoopStyle.PingPong){

      this.waitFramesUntilNextFrame--;

      if(this.waitFramesUntilNextFrame <= 0){
          if(this.playDirection === Directions.Right){
            this.currentFrame++;
            this.waitFramesUntilNextFrame = this.frameWaitDuration;
            if(this.currentFrame = this.sprites.length){
              this.currentFrame--;
              this.playDirection = Directions.Left;
            }
          }
          else if(this.playDirection === Directions.Left){
            this.currentFrame--;
            this.waitFramesUntilNextFrame = this.frameWaitDuration;
            if(this.currentFrame < 0){
              this.currentFrame++;
              this.playDirection = Directions.Right;
            }
          }
      }
      if(this.restart && this.playDirection === Directions.Right) this.reset();
      if(this.restart && this.playDirection === Directions.Left) this.currentFrame = this.sprites.length - 1;
      return this.sprites[this.currentFrame];
    }
  }
}
