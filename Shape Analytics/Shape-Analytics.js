"use strict";
exports.__esModule = true;
function allSegmentsRecurse(polygon) {
    /*
      it's assumed that the first and the last point are the same
      a polygon is simply an array of points
    */
    if (polygon.length === 1) {
        return [];
    }
    else {
        return [[polygon[0], polygon[1]]]
            .concat(allSegmentsRecurse(polygon.slice(1)));
    }
}
function allSegments(polygon) {
    return allSegmentsRecurse(polygon.concat([polygon[0]]));
}
exports.allSegments = allSegments;
function triangulatePolygon(polygon) {
    /** ...... */
}
function getBoundingboxForPoints(points) {
    //diese Funktion ist sehr langsam
    var xs = points.map(function (x) { return x[0]; }).sort(function (a, b) { return a - b; });
    var ys = points.map(function (x) { return x[1]; }).sort(function (a, b) { return a - b; });
    return [xs[0], ys[0], xs[xs.length] - xs[0], ys[ys.length] - ys[0]];
}
exports.getBoundingboxForPoints = getBoundingboxForPoints;
function getBoundingboxForSegment(segment) {
    var end_punkt = segment[1];
    var start_punkt = segment[0];
    var width = Math.abs(end_punkt[0] - start_punkt[0]);
    var height = Math.abs(end_punkt[1] - start_punkt[1]);
    var anchor = [Math.min(start_punkt[0], end_punkt[0]), Math.min(start_punkt[1], end_punkt[1])];
    return anchor.concat([width, height]);
}
exports.getBoundingboxForSegment = getBoundingboxForSegment;
function getBoundingboxForCircle(center, radius) {
    return [center[0] - radius, center[1] - radius, radius * 2, radius * 2];
}
exports.getBoundingboxForCircle = getBoundingboxForCircle;
