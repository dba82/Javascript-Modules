"use strict";
exports.__esModule = true;
var Coord = require("db82-coordinate-transformation");
/*{
  required : [angles, centerX, centerY, radius],
  check : {
    angles : function(angles){ _.every(function(a){ return _.isInteger(a) && _.inRange(n, 0, 360)})},
    centerX: 'Number',
    centerY: 'Number',
    radius: 'Number'
  }
}*/
exports.pointsFromAngles = function (angles, centerX, centerY, radius) {
    return angles.map(function (x) { return Coord.polarToCartesian(centerX, centerY, radius, x); });
};
/*{
  required : [n, centerX, centerY, radius],
  'default' : {
    startAngle: 0
  },
  check : {
    n : function(n){ return _.isInteger(n) && n > 2},
    startAngle: function(a){ return _.isInteger(a) && _.inRange(n, 0, 360)},
    centerX: 'Number',
    centerY: 'Number',
    radius: 'Number'
  }
}*/
exports.equidistantPoints = function (n, centerX, centerY, radius, startAngle) {
    var range = [];
    for (var i = 0; i < n; i++) {
        range.push(i);
    }
    return exports.pointsFromAngles(range
        .map(function (x) { return x * 360 / n; })
        .map(function (x) { return (startAngle + x) % 360; }), centerX, centerY, radius);
};
