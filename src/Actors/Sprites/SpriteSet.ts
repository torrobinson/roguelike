import { Enums } from 'src/Helpers/Enums'
import { Sprite } from 'src/Actors/Sprites/Sprite'

// A Sprite Set represents a set of sprites (or frames) representing an actor in a given status and facing a given direction.
// Its animationLoopStyle defines how, if at all, it animates
export class SpriteSet {
    status: Enums.ActorStatus;
    direction: Enums.Direction;
    sprites: Sprite[];
    animationLoopStyle: Enums.AnimationLoopStyle;
    frameWaitDuration: number;
    currentFrame: number = 0;
    waitFramesUntilNextFrame: number = 0;
    playDirection: Enums.Direction = Enums.Direction.Right;
    restart: boolean = false;

    constructor(
        status: Enums.ActorStatus,
        direction: Enums.Direction,
        sprites: Sprite[],
        animationLoopStyle: Enums.AnimationLoopStyle,
        frameWaitDuration?: number) {

        // Default the frame wait duration of not provided
        if (!frameWaitDuration) {
            frameWaitDuration = Enums.GameDefault.FrameWaitDuration;
        }

        // Given an actor's status and direction
        this.status = status;
        this.direction = direction;

        // Play these sprites
        this.sprites = sprites;
        this.animationLoopStyle = animationLoopStyle;
        this.frameWaitDuration = frameWaitDuration;
    }

    reset() {
        this.waitFramesUntilNextFrame = 0;
        this.currentFrame = 0;
        this.restart = false;
    }

    getSprite(restart: boolean) {
        this.restart = restart !== undefined && restart === true;

        // Static sprites are always just the first sprite/frame
        if (this.animationLoopStyle === Enums.AnimationLoopStyle.Static) {
            return this.sprites.first();
        }

        // One-time animations reach their last frame and then stop
        if (this.animationLoopStyle === Enums.AnimationLoopStyle.Once) {
            this.waitFramesUntilNextFrame--;
            // Advance if there's still frames to play
            if (this.waitFramesUntilNextFrame <= 0) {
                if (this.currentFrame < this.sprites.length - 1) {
                    this.currentFrame++;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                }

                if (this.restart) this.currentFrame = 0;
            }
            return this.sprites[this.currentFrame];
        }

        // Looping animations advance back to frame 1 when finished
        if (this.animationLoopStyle === Enums.AnimationLoopStyle.Loop) {
            this.waitFramesUntilNextFrame--;
            if (this.waitFramesUntilNextFrame <= 0) {
                // Advance
                this.currentFrame++;
                this.waitFramesUntilNextFrame = this.frameWaitDuration;
                // Wrap back to start if needed
                if (this.currentFrame >= this.sprites.length) {
                    this.currentFrame = 0;
                }
            }
            if (this.restart) this.reset();
            return this.sprites[this.currentFrame];
        }

        // Ping-pong animation play forwards, backwards, and then repeat
        if (this.animationLoopStyle === Enums.AnimationLoopStyle.PingPong) {

            this.waitFramesUntilNextFrame--;

            if (this.waitFramesUntilNextFrame <= 0) {
                if (this.playDirection === Enums.Direction.Right) {
                    this.currentFrame++;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                    if (this.currentFrame = this.sprites.length) {
                        this.currentFrame--;
                        this.playDirection = Enums.Direction.Left;
                    }
                }
                else if (this.playDirection === Enums.Direction.Left) {
                    this.currentFrame--;
                    this.waitFramesUntilNextFrame = this.frameWaitDuration;
                    if (this.currentFrame < 0) {
                        this.currentFrame++;
                        this.playDirection = Enums.Direction.Right;
                    }
                }
            }
            if (this.restart && this.playDirection === Enums.Direction.Right) this.reset();
            if (this.restart && this.playDirection === Enums.Direction.Left) this.currentFrame = this.sprites.length - 1;
            return this.sprites[this.currentFrame];
        }
    }
}
