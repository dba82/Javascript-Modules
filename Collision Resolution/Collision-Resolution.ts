import { vec } from '2d-vector-functions';
import { allSegments } from 'db82-shape-analytics';
import { circleIntersectsSegment } from 'db82-shape-intersection-detectors';
function pointSegmentDistance(p, segment) {
  let l2 = Math.pow(vec.distance(segment[1], segment[0]),2);
  if ( l2 == 0.0 ) return vec.distance(p, segment[0]);
  let segmentVec = vec.subtract(segment[1], segment[0]);
  let PointSegmentstartVec = vec.subtract(p, segment[0]);
  let dot =  vec.dotProduct(PointSegmentstartVec, segmentVec);
  let lambda = Math.max(0, Math.min(1, dot/l2));
  let projection =  vec.add(vec.multiply(lambda, segmentVec), segment[0]);
  return vec.distance(p, projection);
}

export function ballVBall(a,b){
    let m = Math.max(a.radius + b.radius - vec.distance(a.position, b.position), 0);
    let normal = vec.withLength(Math.max(+a.restitution, +b.restitution) + m, vec.subtract(a.position, b.position));
    a.velocity = vec.add(a.velocity, normal)
    b.velocity = vec.add(b.velocity, vec.inverse(normal))
}
export function ballVStaticSegment(ball, s){
    let m = ( +ball.restitution || 0 ) + Math.max(ball.radius - pointSegmentDistance(ball.position, [s.end, s.position]), 0);
    let normal = vec.normal(vec.subtract(s.end, s.position));
    ball.velocity = vec.add(ball.velocity, vec.withLength(m , normal));
}
export function ballVPolygon(a,b){
    allSegments(b.getShape())
        .filter(x => circleIntersectsSegment(a.getShape(), x))
        .forEach( x => {
            let m = ( +a.restitution || 0 ) + Math.max(a.radius - pointSegmentDistance(a.position, x), 0);
            let normal = vec.normal(vec.subtract(...x));
            a.velocity = vec.add(a.velocity, vec.withLength(m , normal))
            b.velocity = vec.add(b.velocity, vec.withLength(m , vec.inverse(normal)))
        });
}