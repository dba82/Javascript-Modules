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
var db82_shape_analytics_1 = require("db82-shape-analytics");
var db82_physics_body_1 = require("db82-physics-body");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(id, position, radius) {
        if (radius === void 0) { radius = 5; }
        var _this = _super.call(this, id) || this;
        _this.position = position;
        _this.radius = radius;
        _this.color = 'purple';
        _this['init']();
        return _this;
    }
    Circle.prototype.getBoundingbox = function () { return db82_shape_analytics_1.getBoundingboxForCircle(this.position, this.radius); };
    Circle.prototype.getShape = function () { return { radius: this.radius, center: this.position }; };
    Circle.prototype.getVolume = function () { return this.radius * this.radius * Math.PI; };
    Circle.prototype.draw = function (dcan) {
        dcan.ctx.fillStyle = this.color;
        dcan.circle(this.position, this.radius);
        dcan.fill();
    };
    return Circle;
}(db82_physics_body_1.Body));
exports.Circle = Circle;
