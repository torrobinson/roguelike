Random = function(seed){
    this.seed = seed;

    this.go = function(){
        // Fetches the next random number in the sequence
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    };

    this.next = function(min, max){
        // Fetches the next random number in the sequence, with a minimum and maximum
        return Math.floor(this.go() * (max-min)) + min;
    };

    this.nextWeighted = function(min, max){
        // Fetches the next random number in the sequence, with a minimum and maximum, and weighted
        //  towards the center.
        // This is done by generating only two numbers at half the maximum and adding them together
        return (Math.floor(this.go() * (max/2)) + min) + (Math.floor(this.go() * (max/2)) + min);
    };
};
