import * as flatten from 'lodash.flatten';
import * as shapeAna from 'db82-shape-analytics';
import { vec } from '2d-vector-functions';
import * as comb from 'db82-combinatorics';
import { segmentContainsPoint } from 'db82-shape-point-containment-functions';

export function pointIsColinearToLine(p, l){
  return (p[0] - l[1][0]) / (l[0][0] - l[1][0]) === (p[1] - l[1][1]) / (l[0][1] - l[1][1]);
}

function segmentIntersectsSegment(s1, s2){
    let a = s1[0]
    let b = s1[1]
    let v = s2[0]
    let w = s2[1]
    let a1 = a[0]
    let a2 = a[1]
    let b1 = b[0]
    let b2 = b[1]
    let v1 = v[0]
    let v2 = v[1]
    let w1 = w[0]
    let w2 = w[1]
    let w22 = w2 * w2;
    let w12 = w1 * w1;
    let w1w2 = w1 * w2;
    let b22 = b2 * b2;
    let b12 = b1 * b1
    let ro, lambda;
    if (v1 != w1){
        let num = -b2 + ((b1-w1)/(v1-w1))*(v2-w2)+w2;
        let denom = a2-b2 + ((-a1*v2+b1*v2+a1*w2-b1*w2)/(v1-w1));
        ro = num/denom;
        lambda = (ro*a1 + b1 - ro*b1 - w1)/(v1-w1)
    } else if (v2 != w2){
        let num = -b1 + ((b2-w2)/(v2-w2))*(v1-w1)+w1;
        let denom = a1-b1 + ((-a2*v1+b2*v1+a2*w1-b2*w1)/(v2-w2));
        ro = num/denom;
        lambda = (ro*a2 + b2 - ro*b2 - w2)/(v2-w2)
    } else {
        return segmentContainsPoint(s1, s2[0])
    }
    if ( ro <= 1 && ro >= 0 && lambda <= 1 && lambda >= 0){
      return [vec.add(vec.multiply(ro, a),vec.multiply(1-ro, b))];
    } else return [];
}


export function polygonIntersectsPolygon(s1, s2){
  return comb.allUnorderedCombinations(shapeAna.allSegments(s1), shapeAna.allSegments(s2))
            .map(function(x){return segmentIntersectsSegment(x[0], x[1])})
            .filter(function(x){return x})
}

export function polygonIntersectsSegment(p, s){
  return shapeAna.allSegments(p).map(function(x){return segmentIntersectsSegment(x, s)}).filter(function(x){return x})
}

export function circleIntersectsCircle(c1, c2){
  var distanceBetweenTheCenters,
  distanceBetweenCenterOfC1AndTheCenterOfTheIntersectionOfTheC1AndC2,
  between, towards, vectorThatAddedToTheCenterOfC1PointsToTheCenterOfTheIntersectionOfC1AndC2,
  on,distanceOfTheMiddleOfTheIntersectionOfC1AndC2ToEitherOfTheIntersectingPoints;

  distanceBetweenTheCenters = vec.distance(c1.center, c2.center)

  if (distanceBetweenTheCenters > c1.radius + c2.radius
			|| (c1.center[0] === c2.center[0] && c1.center[1] === c2.center[1] && c1.radius === c2.radius)) return [];

  distanceBetweenCenterOfC1AndTheCenterOfTheIntersectionOfTheC1AndC2 = (distanceBetweenTheCenters - c2.radius + c1.radius) / 2
  between = vec.subtract(c2.center, c1.center)
  towards = vec.direction(between)
  vectorThatAddedToTheCenterOfC1PointsToTheCenterOfTheIntersectionOfC1AndC2 = vec.multiply(distanceBetweenCenterOfC1AndTheCenterOfTheIntersectionOfTheC1AndC2, towards);
  on = vec.orthonormals(vectorThatAddedToTheCenterOfC1PointsToTheCenterOfTheIntersectionOfC1AndC2);
  distanceOfTheMiddleOfTheIntersectionOfC1AndC2ToEitherOfTheIntersectingPoints = Math.sqrt(Math.pow(c1.radius, 2) - Math.pow(distanceBetweenCenterOfC1AndTheCenterOfTheIntersectionOfTheC1AndC2,2));
  return on.map(function(o){
    return vec.add(vec.add(c1.center, vectorThatAddedToTheCenterOfC1PointsToTheCenterOfTheIntersectionOfC1AndC2), vec.multiply(distanceOfTheMiddleOfTheIntersectionOfC1AndC2ToEitherOfTheIntersectingPoints, o));
  })
}

export function circleIntersectsSegment(circ, s){/*equivalent to "it exists a point on s such that the distance to the center of c is equal to c's radius" equivalent to "it exists w such that distance(c.center, w * s[0] + (1 - w) * s[1]) === radius AND w in [0,1]" so we just solve for w and see if it is in [0, 1] haha "just"..... it took me hours to not make a mistake with the minuses and pluses .......*/
  var x1, x2, z, r, a, b, c, diskr, w1, w2;
  x1 = s[0];
	x2 = s[1];
	z  = circ.center;
	r = circ.radius;


  a = Math.pow(x1[0] - x2[0], 2)
			+ Math.pow(x1[1] - x2[1], 2);
  b = -2  * (x1[0] - x2[0]) * z[0] + 2 * (x1[0] - x2[0]) * x2[0]
		  - 2 * (x1[1] - x2[1]) * z[1] + 2 * (x1[1] - x2[1]) * x2[1];
  c = Math.pow(z[0], 2) + Math.pow(x2[0], 2) - 2 * x2[0] * z[0]
			+ Math.pow(z[1], 2) + Math.pow(x2[1], 2) - 2 * x2[1] * z[1]
			- Math.pow(r, 2);

	diskr = Math.pow(b, 2) - (4 * a * c)
	if (diskr < 0) return [];

	w1 = (-b + Math.sqrt(diskr)) / (2 * a);
	w2 = (-b - Math.sqrt(diskr)) / (2 * a);
	return [w1, w2]
					.filter(function(x){
							return (x <= 1 && x >= 0);
					})
					.filter(function(w){
							return ((vec.distance(circ.center, vec.add(vec.multiply(w, s[0]), vec.multiply((1-w), s[1])))) - r < 0.000001);
					})
					.map(function(x){
							return vec.add(vec.multiply(x, s[0]), vec.multiply((1-x), s[1]))
					})
}

export function circleIntersectsPolygon(c, p){
  return flatten(shapeAna.allSegments(p)
          .map(function(x){return circleIntersectsSegment(c, x)})
          .filter(function(x){return x}))
}

export function boundingboxIntersectsBoundingbox(a,b){//x,y,w,h MUSS NOCH GEÄNDERT WERDEN; DASS ES AUCH DIE PUNKTE RAUSGIBT! 
/*  
  let b_upLeft = [b[0], b[1]];
  let a_upLeft = [a[0], a[1]];
  let b_width = b[2];
  let a_width = a[2];
  let b_height = b[3];
  let a_height = a[3];
  let b_left = b[0];
  let b_right = b[0] + b_width;
  let b_up = b[1];
  let b_low = b[1] + b_height;
  let a_left = a[0];
  let a_right = a[0] + a_width;
  let a_up = a[1];
  let a_low = a[1] + a_height;
  let b_upRight = [b_upLeft[0] + b_width, b[1]];
  let b_lowLeft = [b[0] , b_upLeft[1] + b_height];
  let b_lowRight = [b_upLeft[0] + b_width, , b_upLeft[1] + b_height];
  let a_upRight = [a_upLeft[0] + a_width, a[1]];
  let a_lowLeft = [a[0] , a_upLeft[1] + a_height];
  let a_lowRight = [a_upLeft[0] + a_width, , a_upLeft[1] + a_height];
*/
  return !((b[0] >= (a[0] + a[2])) || (b[1] >= (a[1] + a[3])) || ((b[0] + b[2]) <= a[0]) || (b[1] + b[3] <= a[1]));
  
//  return !((b[0] > (a[0] + a[2])) || (b[1] > (a[1] + a[3])) || ((b[0] + b[2]) < a[0]) || (b[1] + b[3] < a[1]));
}