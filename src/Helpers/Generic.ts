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
  
}
