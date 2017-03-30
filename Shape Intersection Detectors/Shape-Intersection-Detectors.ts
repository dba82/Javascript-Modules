import { allSegments } from 'db82-shape-analytics';
import { segmentContainsPoint } from 'db82-shape-point-containment-functions';

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
    return ( ro <= 1 && ro >= 0 && lambda <= 1 && lambda >= 0)
}


export function segmentIntersectsBoundingbox(s, b){
    return segmentIntersectsSegment([[b[0], b[1]], [b[0]+b[2], b[1]]], s) ||
        segmentIntersectsSegment([[b[0]+b[2], b[1]], [b[0]+b[2], b[1]+b[3]]], s) ||
        segmentIntersectsSegment([[b[0], b[1]], [b[0], b[1]+b[3]]], s) ||
        segmentIntersectsSegment([[b[0], b[1]+b[3]], [b[0]+b[2], b[1]+b[3]]], s)
}

export function segmentIntersectsPolygon(s, p){
    for (let segment of allSegments(p)){
        if (segmentIntersectsSegment(segment, s)) return true
    }
    return false;
}

export function circleIntersectsCircle(c1, c2){
    return (c1.center[0] - c2.center[0]) * (c1.center[0] - c2.center[0]) + (c1.center[1] - c2.center[1]) * (c1.center[1] - c2.center[1]) <= (c1.radius  + c2.radius) *  (c1.radius  + c2.radius);
}

export function circleIntersectsBoundingbox(c, b){//wir schauen, ob der Kreismittelpunkt in einer Boundingbox liegt, die um b herum liegt und zwar überall mit Abstand c.radius 
 return (c.center[0] >= b[0]-c.radius) && (c.center[0] <= b[0]-c.radius + b[2]+2*c.radius) && (c.center[1] >= b[1]-c.radius) && (c.center[1] <= b[1] + b[3] + 2*c.radius)
}

export function circleIntersectsPolygon(c, p){
    for (let segment of allSegments(p)){
        if (circleIntersectsSegment(c, segment)) return true
    }
    return false;
}

export function circleIntersectsSegment(c, s){
  var x1, x2, z, r, a, b, c, diskr, w1, w2;
  x1 = s[0];
	x2 = s[1];
	z  = c.center;
	r = c.radius;


  a = Math.pow(x1[0] - x2[0], 2)
			+ Math.pow(x1[1] - x2[1], 2);
  b = -2  * (x1[0] - x2[0]) * z[0] + 2 * (x1[0] - x2[0]) * x2[0]
		  - 2 * (x1[1] - x2[1]) * z[1] + 2 * (x1[1] - x2[1]) * x2[1];
  c = Math.pow(z[0], 2) + Math.pow(x2[0], 2) - 2 * x2[0] * z[0]
			+ Math.pow(z[1], 2) + Math.pow(x2[1], 2) - 2 * x2[1] * z[1]
			- Math.pow(r, 2);

	diskr = Math.pow(b, 2) - (4 * a * c)
    if (diskr < 0) return false;

	w1 = (-b + Math.sqrt(diskr)) / (2 * a);
	w2 = (-b - Math.sqrt(diskr)) / (2 * a);
	return [w1, w2]
					.some(function(x){
							return (x <= 1 && x >= 0);
					})
}

export function boundingboxIntersectsPolygon(b, p){
    for (let segment of allSegments(p)){
        if (segmentIntersectsBoundingbox(segment, b)) return true
    }
    return false;
}

export function boundingboxIntersectsBoundingbox(a,b){//x,y,w,h
  return !((b[0] >= (a[0] + a[2])) || (b[1] >= (a[1] + a[3])) || ((b[0] + b[2]) <= a[0]) || (b[1] + b[3] <= a[1]));
}

export function polygonIntersectsPolygon(p1, p2){
    for (let segment of allSegments(p1)){
        if (segmentIntersectsPolygon(segment, p2)) return true;
    }
    return false;
}