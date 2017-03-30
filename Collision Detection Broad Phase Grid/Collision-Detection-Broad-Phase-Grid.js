"use strict";
exports.__esModule = true;
var db82_shape_overlap_functions_1 = require("db82-shape-overlap-functions");
var Grid = (function () {
    function Grid(width, height, nOfRows, nOfColumns) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.nOfRows = nOfRows;
        this.nOfColumns = nOfColumns;
        //for the idea behind such a grid cf. http://stackoverflow.com/questions/1616448/broad-phase-collision-detection-methods
        this.rowBorders = [];
        this.columnBorders = [];
        this.cells = [];
        for (var r = 0; r < this.nOfRows; r += 1) {
            this.rowBorders.push(r * this.height / this.nOfRows);
        }
        this.rowBorders.push(this.height);
        for (var c = 0; c < this.nOfColumns; c += 1) {
            this.columnBorders.push(c * this.width / this.nOfColumns);
        }
        this.columnBorders.push(this.width);
        var cellHeight = this.height / nOfRows;
        var cellWidth = this.width / nOfColumns;
        this.columnBorders.forEach(function (x) {
            _this.rowBorders.forEach(function (y) {
                _this.cells.push([x, y, cellWidth, cellHeight]);
            });
        });
    }
    Grid.prototype.putObjectsOnGrid = function (objects) {
        return this.cells.map(function (cell) { return objects.filter(function (o) { return db82_shape_overlap_functions_1.boundingboxOverlapsBoundingbox(o.getBoundingbox(), cell); }); });
    };
    return Grid;
}());
exports.Grid = Grid;
