import { allSegments } from 'db82-shape-analytics';
import { segmentIntersectsSegment } from 'db82-shape-intersection-detectors';

export function lineContainsPoint(l, p){
  return (p[0] - l[1][0]) / (l[0][0] - l[1][0]) === (p[1] - l[1][1]) / (l[0][1] - l[1][1]);
}

export function segmentContainsPoint(s, p){
    let l = (p[1]-s[0][1])/(s[1][1]-s[0][1])
    return l === (p[0]-s[0][0])/(s[1][0]-s[0][0]) && l <=1 && l >= 0;
}

export function boundingboxContainsPoint(p, b){
    return (p[0] >= b[0]) && (p[0] <= b[0] + b[2]) && (p[1] >= b[1]) && (p[1] <= b[1] + b[3]);
}

export function circleContainsPoint(c, p){
    let a = (p[0] - c.center[0])
    let b = (p[1] - c.center[1])
    return a * a + b * b < c.radius * c.radius;
}

export function polygonContainsPoint(pol, p){
    let mostRightPointOfPolX = Math.max.apply(pol.map( x => x[0]));
    let segmentsOfPol = allSegments(pol);
    let count = 0;
    for (let segment of segmentsOfPol){
        if (segmentIntersectsSegment([p, [mostRightPointOfPolX, p[1]]], segment)){
            count++;
        }
    }
    return !(count % 2);
}