var xMath = require('../Math/Math');
var xMath = ......

/*
	the super flexible vectorfunctions are way too slow for 2d-drawing stuff
*/
function add(v1, v2){
	return [v1[0]+v2[0], v1[1]+v2[1], v1[2]+v2[2]]
}

function multiply(s, v){
	return [s*v[0], s*v[1], s*v[2]]
};

function subtract(v1, v2){
  return [v1[0]-v2[0], v1[1]-v2[1], v1[2]-v2[2]]
}

function dotProduct(v1, v2){
	return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};

function length(v){//=norm
	return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2])
};

function distance(v1, v2){
	return Math.sqrt((v1[0]-v2[0])*(v1[0]-v2[0]) + (v1[1]-v2[1])*(v1[1]-v2[1]) + (v1[2]-v2[2])*(v1[2]-v2[2]))
};

function direction(v){//=normalize
	if (v[0] === 0 && v[1] === 0 && v[2] === 0) return v;
	return [v[0]/Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]), v[1]/Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]), v[2]/Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2])];
};

function modulo(v, nVector){
    return [xMath.modulo(v[0],nVector[0]),xMath.modulo(v[1],nVector[1]), xMath.modulo(v[2],nVector[2])]
  };

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
