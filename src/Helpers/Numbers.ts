class Numbers{
  static roundToOdd(i: number){
      return 2* Math.floor(i/2) + 1;
  }
  static isNumber(obj: Object) {
      return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
  }
  static isOdd(obj: number){
      return Numbers.isNumber(obj) && obj % 2;
  }
  static isEven(obj: number){
      return Numbers.isNumber(obj) && ! (obj%2);
  }
}
