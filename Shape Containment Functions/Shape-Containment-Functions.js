"use strict";
exports.__esModule = true;
var si = require("db82-shape-intersection-detectors");
var pc = require("db82-shape-point-containment-functions");
function polygonIsInsideBoundingbox(p, b) {
    return p.every(function (x) { return pc.boundingboxContainsPoint(b, x); });
}
exports.polygonIsInsideBoundingbox = polygonIsInsideBoundingbox;
function polygonIsInsideCircle(p, b) {
    return p.every(function (x) { return pc.circleContainsPoint(b, x); });
}
exports.polygonIsInsideCircle = polygonIsInsideCircle;
function circleIsInsideBoundingbox(c, b) {
    return pc.boundingboxContainsPoint(b, c.center) && !si.circleIntersectsBoundingbox(c, b);
}
exports.circleIsInsideBoundingbox = circleIsInsideBoundingbox;
function boundingboxIsInsideCircle(b, c) {
    var p = [b[0], b[1], b[0] + b[2], b[1] + b[3]];
    return p.every(function (x) { return pc.circleContainsPoint(c, x); });
}
exports.boundingboxIsInsideCircle = boundingboxIsInsideCircle;
function boundingboxIsInsideBoundingbox(a, b) {
    return b[0] < a[0] && (a[0] + a[2] < b[0] + b[2]) && (b[1] < a[1]) && (a[1] + a[3] < b[1] + b[3]);
}
exports.boundingboxIsInsideBoundingbox = boundingboxIsInsideBoundingbox;
function circleIsInsideCircle(c1, c2) {
    return pc.circleContainsPoint(c2, c1.center) && !si.circleIntersectsCircle(c1, c2);
}
exports.circleIsInsideCircle = circleIsInsideCircle;
function circleIsInsidePolygon(c, p) {
    return pc.polygonContainsPoint(p, c.center) && !si.circleIntersectsPolygon(c, p);
}
exports.circleIsInsidePolygon = circleIsInsidePolygon;
