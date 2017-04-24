// Array extensions
Array.prototype.first = function() {
    if(this.length){
        return this[0];
    }
    else{
        return null;
    }
};
Array.prototype.second = function() {
    if(this.length>1){
        return this[1];
    }
    else{
        return null;
    }
};

Array.prototype.last = function() {
    if(this.length){
        return this[this.length-1];
    }
    else{
        return null;
    }
};

Array.prototype.secondLast = function() {
    if(this.length>1){
        return this[this.length-2];
    }
    else{
        return null;
    }
};

Array.prototype.remove = function(obj){
    var index = this.indexOf(obj);
    if(index>-1){
        return this.splice(index,1);
    }
    else{
        return this;
    }
};

Array.prototype.firstOrDefault = function(def) {
    if(this.length){
        return this[0];
    }
    else{
        return def;
    }
};

// TODO reimplement when it can take in a Random() that's already been seeded
// Array.prototype.shuffle = function(){
//     var a = this;
//     for (let i = a.length; i; i--) {
//         let j = Math.floor(Math.random() * i);
//         [a[i - 1], a[j]] = [a[j], a[i - 1]];
//     }
//     return a;
// };

Array.prototype.pickRandom = function(random){
    return this[random.next(0,this.length-1)];
};

Array.prototype.contains=function(needle){
    return this.indexOf(needle) >-1;
};

Array.prototype.onlyOdd=function(){
    this.filter(Numbers.isOdd);
};

Array.prototype.onlyEven=function(){
    this.filter(Numbers.isEven);
};

Array.prototype.getTile=function(x,y){
    return this[y][x];
};
