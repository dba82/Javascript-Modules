"use strict";
exports.__esModule = true;
var MathExtension = (function () {
    function MathExtension() {
    }
    MathExtension.prototype.modulo = function (n, m) {
        return (n >= 0)
            ? n % m
            : (m + (n % m)) % m;
    };
    MathExtension.prototype.sign = function (n) {
        return (n > 0) ? 1
            : (n < 0) ? -1
                : 0;
    };
    MathExtension.prototype.binSign = function (n) {
        return (n >= 0)
            ? 1
            : -1;
    };
    return MathExtension;
}());
exports.xMath = new MathExtension();
