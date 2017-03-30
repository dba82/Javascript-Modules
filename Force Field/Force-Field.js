"use strict";
exports.__esModule = true;
var _2d_vector_functions_1 = require("2d-vector-functions");
var RadialForcefield = (function () {
    function RadialForcefield(position, strength, reach) {
        this.position = position;
        this.strength = strength;
        this.reach = reach;
    }
    RadialForcefield.prototype.applyToBodies = function (bodies) {
        this.getBodiesInReach(bodies).forEach(this.applyToBody.bind(this));
    };
    RadialForcefield.prototype.getBodiesInReach = function (bodies) {
        var _this = this;
        return bodies.filter(function (b) { return _2d_vector_functions_1.vec.distance(_this.position, b.position) < _this.reach; });
    };
    RadialForcefield.prototype.applyToBody = function (b) {
        var dir = _2d_vector_functions_1.vec.direction(_2d_vector_functions_1.vec.subtract(this.position, b.position));
        var d = _2d_vector_functions_1.vec.distance(this.position, b.position);
        b.applyForce(_2d_vector_functions_1.vec.multiply(this.strength / d * d, dir));
    };
    return RadialForcefield;
}());
exports.RadialForcefield = RadialForcefield;
