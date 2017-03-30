import * as si from 'db82-shape-intersection-detectors';
import * as sc from 'db82-shape-containment-functions';

export function boundingboxOverlapsBoundingbox(a,b){
    return si.boundingboxIntersectsBoundingbox(a,b) || sc.boundingboxContainsBoundingbox(a,b) || sc.boundingboxContainsBoundingbox(b,a);
}

export function boundingboxOverlapsCircle(a,b){
    return si.boundingboxIntersectsCircle(a,b) || sc.circleContainsBoundingbox(b,a) || sc.boundingboxContainsCircle(a,b);
}

export function boundingboxOverlapsPolygon(a,b){
    return si.boundingboxIntersectsPolygon(a,b) || sc.boundingboxContainsPolygon(a,b) || sc.polygonContainsBoundingbox(b,a);
}

export function circleOverlapsCircle(a,b){
    return si.circleIntersectsCircle(a,b) || sc.circleContainsCircle(b,a) || sc.circleContainsCircle(a,b);
}

export function circleOverlapsPolygon(a,b){
    return si.circleIntersectsPolygon(a,b) || sc.polygonContainsCircle(b,a) || sc.circleContainsPolygon(a,b);
}

export function polygonOverlapsPolygon(a,b){
    return si.polygonIntersectsPolygon(a,b) || sc.polygonContainsPolygon(a,b) || sc.polygonContainsPolygon(b,a);
}

