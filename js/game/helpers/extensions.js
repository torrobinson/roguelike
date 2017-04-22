// Array extensions
Array.prototype.first = function() {
    if(this.length){
        return this[0];
    }
    else{
        return null;
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
