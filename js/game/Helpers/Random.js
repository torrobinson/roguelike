Random = function(seed,min,max){
    this.seed = seed;
    this.min = min;
    this.max = max;

    this.generate = function(){
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    };

    this.next = function(){
        return Math.floor(this.generate() * this.max) + this.min;
    };
};
