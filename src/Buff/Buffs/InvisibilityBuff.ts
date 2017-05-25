// <reference path="../Base/Buff.ts" />
class InvisibilityBuff extends Buff {
    maxUses: number = 30;
    namePart: string = 'Invisibility';
    color: number = ColorCode.DarkGrey;

    getDescription() {
        return "Invisible to enemies for the next " + this.getUsesRemaining() + ' actions';
    }

    // After this buff is added, flip the actor to invisible
    onBuffEquippedAfter(user: Actor, buff: Buff){
      if(buff === this) user.isVisible = false;
    }

    // Right before we remove this buff, flip the actor to visible again
    onBuffUnequippedBefore(user: Actor, buff: Buff){
      if(buff === this) user.isVisible = true;
    }

    // Every tick while on, count as a use
    tickedAfter(){
        this.used();
    }

}
