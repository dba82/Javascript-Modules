"use strict";
exports.__esModule = true;
var _2d_vector_functions_1 = require("2d-vector-functions");
var db82_shape_analytics_1 = require("db82-shape-analytics");
var db82_shape_intersection_detectors_1 = require("db82-shape-intersection-detectors");
function pointSegmentDistance(p, segment) {
    var l2 = Math.pow(_2d_vector_functions_1.vec.distance(segment[1], segment[0]), 2);
    if (l2 == 0.0)
        return _2d_vector_functions_1.vec.distance(p, segment[0]);
    var segmentVec = _2d_vector_functions_1.vec.subtract(segment[1], segment[0]);
    var PointSegmentstartVec = _2d_vector_functions_1.vec.subtract(p, segment[0]);
    var dot = _2d_vector_functions_1.vec.dotProduct(PointSegmentstartVec, segmentVec);
    var lambda = Math.max(0, Math.min(1, dot / l2));
    var projection = _2d_vector_functions_1.vec.add(_2d_vector_functions_1.vec.multiply(lambda, segmentVec), segment[0]);
    return _2d_vector_functions_1.vec.distance(p, projection);
}
function ballVBall(a, b) {
    var m = Math.max(a.radius + b.radius - _2d_vector_functions_1.vec.distance(a.position, b.position), 0);
    var normal = _2d_vector_functions_1.vec.withLength(Math.max(+a.restitution, +b.restitution) + m, _2d_vector_functions_1.vec.subtract(a.position, b.position));
    a.velocity = _2d_vector_functions_1.vec.add(a.velocity, normal);
    b.velocity = _2d_vector_functions_1.vec.add(b.velocity, _2d_vector_functions_1.vec.inverse(normal));
}
exports.ballVBall = ballVBall;
function ballVStaticSegment(ball, s) {
    var m = (+ball.restitution || 1) + Math.max(ball.radius - pointSegmentDistance(ball.position, [s.end, s.position]), 0);
    var normal = _2d_vector_functions_1.vec.normal(_2d_vector_functions_1.vec.subtract(s.end, s.position));
    ball.velocity = _2d_vector_functions_1.vec.add(ball.velocity, _2d_vector_functions_1.vec.withLength(m, normal));
}
exports.ballVStaticSegment = ballVStaticSegment;
function ballVPolygon(a, b) {
    db82_shape_analytics_1.allSegments(b.getShape())
        .filter(function (x) { return db82_shape_intersection_detectors_1.circleIntersectsSegment(a.getShape(), x); })
        .forEach(function (x) {
        var m = (+a.restitution || 0) + Math.max(a.radius - pointSegmentDistance(a.position, x), 0);
        var normal = _2d_vector_functions_1.vec.normal(_2d_vector_functions_1.vec.subtract.apply(_2d_vector_functions_1.vec, x));
        a.velocity = _2d_vector_functions_1.vec.add(a.velocity, _2d_vector_functions_1.vec.withLength(m, normal));
        b.velocity = _2d_vector_functions_1.vec.add(b.velocity, _2d_vector_functions_1.vec.withLength(m, _2d_vector_functions_1.vec.inverse(normal)));
    });
}
exports.ballVPolygon = ballVPolygon;
