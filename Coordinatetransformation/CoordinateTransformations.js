"use strict";
exports.__esModule = true;
var UC = require("db82-unit-conversion");
function linearScale(originalLength, projectedLength, offSet, x) {
    return offSet + (x * projectedLength / originalLength);
}
exports.linearScale = linearScale;
;
function linearScale2D(originalWidth, originalHeight, projectedWidth, projectedHeight, offSetX, offSetY, x, y) {
    return [
        linearScale(originalWidth, projectedWidth, offSetX, x),
        linearScale(originalHeight, projectedHeight, offSetY, y)
    ];
}
exports.linearScale2D = linearScale2D;
;
function cartesianToPolar(centerX, centerY, x, y) {
    return [
        Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2)),
        Math.atan2(centerY - y, centerX - x)
    ];
}
exports.cartesianToPolar = cartesianToPolar;
;
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians;
    angleInRadians = UC.degreesToRadians(angleInDegrees);
    return [
        centerX + (radius * Math.cos(angleInRadians)),
        centerY + (radius * Math.sin(angleInRadians))
    ];
}
exports.polarToCartesian = polarToCartesian;
;
