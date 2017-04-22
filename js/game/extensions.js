// Array extensions
Array.prototype.first = function() {
    if(this.length){
        return this[0];
    }
    else{
        return null;
    }
}
Array.prototype.firstOrDefault = function(def) {
    if(this.length){
        return this[0];
    }
    else{
        return def;
    }
}
