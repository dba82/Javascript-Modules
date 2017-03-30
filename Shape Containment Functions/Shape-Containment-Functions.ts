import { vec } from '2d-vector-functions';
import * as si from 'db82-shape-intersection-detectors';
import * as pc from 'db82-shape-point-containment-functions';

export function polygonIsInsideBoundingbox(p, b){
    return p.every(x => pc.boundingboxContainsPoint(b,x));
}

export function polygonIsInsideCircle(p, b){
    return p.every(x => pc.circleContainsPoint(b,x));
}

export function circleIsInsideBoundingbox(c,b){
    return pc.boundingboxContainsPoint(b, c.center) && !si.circleIntersectsBoundingbox(c, b);
}

export function boundingboxIsInsideCircle(b,c){
    let p = [b[0], b[1], b[0]+b[2], b[1]+b[3]];
    return p.every( x => pc.circleContainsPoint(c, x));
}

export function boundingboxIsInsideBoundingbox(a, b){
    return b[0] < a[0] && (a[0] + a[2] < b[0] + b[2]) && (b[1] < a[1]) && (a[1] + a[3] < b[1] + b[3]);
}

export function circleIsInsideCircle(c1, c2){
    return pc.circleContainsPoint(c2, c1.center) && !si.circleIntersectsCircle(c1, c2);
}

export function circleIsInsidePolygon(c, p){
    return pc.polygonContainsPoint(p, c.center) && !si.circleIntersectsPolygon(c, p);
}