// Array extensions
Array.prototype.first = function() {
    if(this.length){
        return this[0];
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

Array.prototype.shuffle = function(){
    var a = this;
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
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
