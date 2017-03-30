"use strict";
exports.__esModule = true;
var db82_shape_analytics_1 = require("db82-shape-analytics");
var db82_shape_intersection_detectors_1 = require("db82-shape-intersection-detectors");
function lineContainsPoint(l, p) {
    return (p[0] - l[1][0]) / (l[0][0] - l[1][0]) === (p[1] - l[1][1]) / (l[0][1] - l[1][1]);
}
exports.lineContainsPoint = lineContainsPoint;
function segmentContainsPoint(s, p) {
    var l = (p[1] - s[0][1]) / (s[1][1] - s[0][1]);
    return l === (p[0] - s[0][0]) / (s[1][0] - s[0][0]) && l <= 1 && l >= 0;
}
exports.segmentContainsPoint = segmentContainsPoint;
function boundingboxContainsPoint(p, b) {
    return (p[0] >= b[0]) && (p[0] <= b[0] + b[2]) && (p[1] >= b[1]) && (p[1] <= b[1] + b[3]);
}
exports.boundingboxContainsPoint = boundingboxContainsPoint;
function circleContainsPoint(c, p) {
    var a = (p[0] - c.center[0]);
    var b = (p[1] - c.center[1]);
    return a * a + b * b < c.radius * c.radius;
}
exports.circleContainsPoint = circleContainsPoint;
function polygonContainsPoint(pol, p) {
    var mostRightPointOfPolX = Math.max.apply(pol.map(function (x) { return x[0]; }));
    var segmentsOfPol = db82_shape_analytics_1.allSegments(pol);
    var count = 0;
    for (var _i = 0, segmentsOfPol_1 = segmentsOfPol; _i < segmentsOfPol_1.length; _i++) {
        var segment = segmentsOfPol_1[_i];
        if (db82_shape_intersection_detectors_1.segmentIntersectsSegment([p, [mostRightPointOfPolX, p[1]]], segment)) {
            count++;
        }
    }
    return !(count % 2);
}
exports.polygonContainsPoint = polygonContainsPoint;
