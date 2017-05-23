class Generic {

  /** If we have an property on a non-classes Object that
  can either be a static attribute OR a function/callback
  that makes it dynamic, then find out which and return.

  This essentially takes in a property and, if it's actually
  a function, resolves the function and returns the static
  result*/
  static ResolveIfDynamic(property){
    return typeof property == 'function' ? property() : property;
  }


  static GetDateTimeStamp(date?: Date){
    if(!date){
        date = new Date();
    }
    return (date.getMonth()+1).toString().padLeft('0',2) + '/' + date.getDate().toString().padLeft('0',2) + '/' +  date.getFullYear().toString().padLeft('0',2) + ' ' + date.getHours().toString().padLeft('0',2) + ':' + date.getMinutes().toString().padLeft('0',2) + ':' + date.getSeconds().toString().padLeft('0',2);
  }

  static GetTimeStamp(date?: Date){
    if(!date){
        date = new Date();
    }
    return date.getHours().toString().padLeft('0',2) + ':' + date.getMinutes().toString().padLeft('0',2) + ':' + date.getSeconds().toString().padLeft('0',2);
  }

  static NewLine() : string{
      return '\r\n';
  }

}
