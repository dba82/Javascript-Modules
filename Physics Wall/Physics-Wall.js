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
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(id, position, end) {
        var _this = _super.call(this, id) || this;
        _this.position = position;
        _this.end = end;
        _this['init']();
        return _this;
    }
    Wall.prototype.getBoundingbox = function () { return db82_shape_analytics_1.getBoundingboxForSegment([this.position, this.end]); };
    Wall.prototype.getShape = function () { return [this.end, this.position]; };
    return Wall;
}(db82_physics_body_1.Body));
exports.Wall = Wall;
