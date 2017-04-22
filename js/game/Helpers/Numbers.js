Numbers = function(){
};

Numbers.roundToOdd =  function(i){
    return 2* Math.floor(i/2) + 1;
};
Numbers.isNumber = function(obj) {
    return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
};
Numbers.isOdd = function(obj){
    return Numbers.isNumber(obj) && obj % 2;
};
Numbers.isEven = function(obj){
    return Numbers.isNumber(obj) && !obj%2;
};
