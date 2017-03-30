"use strict";
exports.__esModule = true;
function pointsOnLine(opt) {
    opt.offSet = opt.offSet || 0;
    if (!opt.spacing) {
        opt.equidistant = true;
    }
    var step;
    var result = [];
    if (opt.equidistant) {
        step = opt.lineLength / opt.numberOfPoints;
    }
    for (var i = 0; i < opt.numberOfPoints; i++) {
        result.push(opt.offSet + i * step);
    }
    return result;
}
exports.pointsOnLine = pointsOnLine;
