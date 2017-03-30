"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _2d_vector_functions_1 = require("2d-vector-functions");
var db82_shape_analytics_1 = require("db82-shape-analytics");
var db82_physics_body_1 = require("db82-physics-body");
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(id, points) {
        var _this = _super.call(this, id) || this;
        /** Punkte müssen im Uhrzeigersinn angegeben werden, damit die Normalen nach aussen zeigen.*/
        _this.position = [0, 0];
        _this.points = [[-1, 1], [-4, -1], [-3, -3], [3, 3], [-1, 1]];
        if (points) {
            if (points[points.length - 1][0] != points[0][0] || points[points.length - 1][1] != points[0][1]) {
                points.push(points[0].slice());
            }
            _this.points = points.slice();
        }
        return _this;
    }
    Polygon.prototype.rotateAround = function (angle, anchor) { };
    Polygon.prototype.move = function () { this.moveBy(this['velocity']); };
    Polygon.prototype.moveBy = function (vector) {
        this.points = this.points.map(function (x) { return _2d_vector_functions_1.vec.add(x, vector); });
        this.position = _2d_vector_functions_1.vec.add(this.position, vector);
        return this;
    };
    Polygon.prototype.scale = function (factor) {
        this.points = this.points.map(function (x) { return _2d_vector_functions_1.vec.multiply(factor, x); });
        return this;
    };
    Polygon.prototype.getBoundingbox = function () { return db82_shape_analytics_1.getBoundingboxForPoints(this.points); };
    Polygon.prototype.getShape = function () { return this.points; };
    Polygon.prototype.getVolume = function () { return 1; };
    Polygon.prototype.draw = function (dcan) {
        dcan.polyline(this.points);
        dcan.ctx.fillStyle = 'white';
        dcan.fill();
    };
    return Polygon;
}(db82_physics_body_1.Body));
exports.Polygon = Polygon;
