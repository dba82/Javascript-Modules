class MathExtension{
  modulo(n : number, m : number){
    return ( n >= 0)
        ? n % m
        : (m+(n%m))%m;
  }

  sign(n : number){
    return   (n > 0) ? 1
         : (n < 0) ? -1
         : 0;
  }

  binSign(n : number){
  return ( n >= 0)
         ?  1
         : -1;
  }
}

export let xMath = new MathExtension();