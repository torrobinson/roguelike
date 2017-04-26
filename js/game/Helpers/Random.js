class Random{
    constructor(seed){
      this.seed = seed;
    }

    go(){
        // Fetches the next random number in the sequence
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    next(min, max){
        // Fetches the next random number in the sequence, with a minimum and maximum
        return Math.floor(this.go() * (max-min)) + min;
    }

    nextWeighted(min, max){
        // Fetches the next random number in the sequence, with a minimum and maximum, and weighted
        //  towards the center.
        // This is done by generating only two numbers at half the maximum and adding them together
        return (Math.floor(this.go() * (max/2)) + min) + (Math.floor(this.go() * (max/2)) + min);
    }
}
