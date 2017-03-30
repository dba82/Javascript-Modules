var xMath = require('../Math/Math');

function add2v(v1, v2){
  if (!v2) return v1;
  return v1.map(function(x, i){return v1[i] + v2[i]})
};

function add(){
  var args, car, cdr;

  args = _.toArray(arguments);
  car = args[0];
  cdr = args.slice(1);
  if (args.length <= 2){
    return add2v.apply(this, args)
  } else {
    return add2v(car, add(cdr))//das ist halt leider nicht tailcall tralalaala
  }
}

function multiply(s, v){
  return v.map(function(x, i){return s * v[i]})
};

function subtract(){
  var args, car, cdr;

  args = _.toArray(arguments);
  car = args[0];
  cdr = args.slice(1);
  return add(car, multiply(-1, add.apply(this, cdr)))
};

function modulo(v, nVector){
  return v.map(function(x, i){
    return xMath.modulo(v[i],nVector[i]);
  });
};

function dotProduct(v1, v2){
  return v1.map(function(x, i){return v1[i] * v2[i]})
           .reduce(function(a, b){return a + b})
};

function length(v){//=norm
  return Math.sqrt(dotProduct(v,v))
};

function direction(v){//=normalize
  if (length(v) === 0) return [0, 0];
  return multiply(1/length(v), v)
};

function distance(v1, v2){
  return length(subtract(v1, v2));
};

function rotate2d(v, t){
  return [v[0] * Math.cos(t) - v[1] * Math.sin(t),
          v[0] * Math.sin(t) + v[1] * Math.cos(t)];
}

function rotate3dZ(v, t){
  return [v[0] * Math.cos(t) - v[1] * Math.sin(t),
          v[0] * Math.sin(t) + v[1] * Math.cos(t),
          v[2]];
}

function rotate3dX(v, t){
  return [v[0] * Math.cos(t) + v[2] * Math.sin(t),
          v[1],
         -v[0] * Math.sin(t) + v[2] * Math.cos(t)];
}

function rotate3dX(v, t){
  return [v[0],
          v[1] * Math.cos(t) - v[2] * Math.sin(t),
          v[1] * Math.sin(t) + v[2] * Math.cos(t)];
}
