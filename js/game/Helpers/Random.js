Random = function(seed){
    this.seed = seed;

    this.go = function(){
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    };

    this.next = function(min, max){
        return Math.floor(this.go() * max) + min;
    };
};
