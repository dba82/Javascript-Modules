"use strict";
exports.__esModule = true;
var xmath_1 = require("xmath");
var VectorFunctions = (function () {
    function VectorFunctions() {
    }
    VectorFunctions.prototype.add = function (v1, v2) {
        return [v1[0] + v2[0], v1[1] + v2[1]];
    };
    VectorFunctions.prototype.multiply = function (s, v) {
        return [s * v[0], s * v[1]];
    };
    VectorFunctions.prototype.subtract = function (v1, v2) {
        return [v1[0] - v2[0], v1[1] - v2[1]];
    };
    VectorFunctions.prototype.dotProduct = function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    };
    VectorFunctions.prototype.length = function (v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    };
    VectorFunctions.prototype.distance = function (v1, v2) {
        return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
    };
    VectorFunctions.prototype.direction = function (v) {
        if (v[0] === 0 && v[1] === 0)
            return v;
        return [v[0] / Math.sqrt(v[0] * v[0] + v[1] * v[1]), v[1] / Math.sqrt(v[0] * v[0] + v[1] * v[1])];
    };
    ;
    VectorFunctions.prototype.rotate2d = function (v, t) {
        return [v[0] * Math.cos(t) - v[1] * Math.sin(t),
            v[0] * Math.sin(t) + v[1] * Math.cos(t)];
    };
    VectorFunctions.prototype.orthonormals = function (v) {
        var w;
        if (v[0] === 0 && v[1] === 0)
            return v;
        w = [(64 * -v[1] / v[0]), 64];
        w = [v[0] / Math.sqrt(w[0] * w[0] + w[1] * w[1]), w[1] / Math.sqrt(w[0] * w[0] + w[1] * w[1])];
        return [w, [-w[0], -w[1]]];
    };
    VectorFunctions.prototype.modulo = function (v, nVector) {
        return [xmath_1.xMath.modulo(v[0], nVector[0]), xmath_1.xMath.modulo(v[1], nVector[1])];
    };
    VectorFunctions.prototype.mirror = function (v, N) {
        var s = (N[0] * v[0] + N[1] * v[1]) / (N[0] * N[0] + N[1] * N[1]);
        return [-v[0] + 2 * s * N[0], -v[1] + 2 * s * N[1]];
    };
    VectorFunctions.prototype.normal = function (v) {
        return [-v[1], v[0]];
    };
    VectorFunctions.prototype.reflect = function (v, w) {
        var o = this.normal(w);
        return this.mirror(this.inverse(v), o);
    };
    VectorFunctions.prototype.inverse = function (v) {
        return [-v[0], -v[1]];
    };
    VectorFunctions.prototype.withLength = function (l, v) {
        return this.multiply(l, this.direction(v));
    };
    VectorFunctions.prototype.normalWithLength = function (l, v) {
        return this.withLength(l, [-v[1], v[0]]);
    };
    return VectorFunctions;
}());
exports.vec = new VectorFunctions();
