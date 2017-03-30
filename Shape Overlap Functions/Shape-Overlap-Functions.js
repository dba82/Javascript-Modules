"use strict";
exports.__esModule = true;
var si = require("db82-shape-intersection-detectors");
var sc = require("db82-shape-containment-functions");
function boundingboxOverlapsBoundingbox(a, b) {
    return si.boundingboxIntersectsBoundingbox(a, b) || sc.boundingboxContainsBoundingbox(a, b) || sc.boundingboxContainsBoundingbox(b, a);
}
exports.boundingboxOverlapsBoundingbox = boundingboxOverlapsBoundingbox;
function boundingboxOverlapsCircle(a, b) {
    return si.boundingboxIntersectsCircle(a, b) || sc.circleContainsBoundingbox(b, a) || sc.boundingboxContainsCircle(a, b);
}
exports.boundingboxOverlapsCircle = boundingboxOverlapsCircle;
function boundingboxOverlapsPolygon(a, b) {
    return si.boundingboxIntersectsPolygon(a, b) || sc.boundingboxContainsPolygon(a, b) || sc.polygonContainsBoundingbox(b, a);
}
exports.boundingboxOverlapsPolygon = boundingboxOverlapsPolygon;
function circleOverlapsCircle(a, b) {
    return si.circleIntersectsCircle(a, b) || sc.circleContainsCircle(b, a) || sc.circleContainsCircle(a, b);
}
exports.circleOverlapsCircle = circleOverlapsCircle;
function circleOverlapsPolygon(a, b) {
    return si.circleIntersectsPolygon(a, b) || sc.polygonContainsCircle(b, a) || sc.circleContainsPolygon(a, b);
}
exports.circleOverlapsPolygon = circleOverlapsPolygon;
function polygonOverlapsPolygon(a, b) {
    return si.polygonIntersectsPolygon(a, b) || sc.polygonContainsPolygon(a, b) || sc.polygonContainsPolygon(b, a);
}
exports.polygonOverlapsPolygon = polygonOverlapsPolygon;
