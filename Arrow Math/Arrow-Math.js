"use strict";
exports.__esModule = true;
var _2d_vector_functions_1 = require("2d-vector-functions");
/*
  Arrow = [ArrowFoot, ArrowTip] (Ankerpunkt und Pfeilspitzenpunkt)
*/
function orthogonal2d(arrow, length) {
    length = length || 1;
    return _2d_vector_functions_1.vec.orthonormals(_2d_vector_functions_1.vec.subtract(arrow[1], arrow[0]))
        .map(function (x) { return _2d_vector_functions_1.vec.add(arrow[0], _2d_vector_functions_1.vec.multiply(length, x)); });
}
exports.orthogonal2d = orthogonal2d;
