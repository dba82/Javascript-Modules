"use strict";
exports.__esModule = true;
function pointsOnGrid(opts) {
    var nofr = opts.numberOfRows;
    var nofc = opts.numberOfColumns;
    var alt = opts.alternating || 1;
    var w = opts.width;
    var h = opts.height;
    var result = [];
    opts.xOffset = opts.xOffset || 0;
    opts.yOffset = opts.yOffset || 0;
    for (var row = 0; row < nofr; row++) {
        for (var column = 0; column < nofc; column++) {
            result.push([
                ((row % alt) * (1 / alt) * (w / nofc)) + opts.xOffset + (w / nofc) * column,
                opts.yOffset + (h / nofr) * row
            ]);
        }
    }
    return result;
}
exports.pointsOnGrid = pointsOnGrid;
