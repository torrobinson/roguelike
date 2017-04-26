class Numbers{
  static roundToOdd(i){
      return 2* Math.floor(i/2) + 1;
  }
  static isNumber(obj) {
      return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
  }
  static isOdd(obj){
      return Numbers.isNumber(obj) && obj % 2;
  }
  static isEven(obj){
      return Numbers.isNumber(obj) && !obj%2;
  }
}
