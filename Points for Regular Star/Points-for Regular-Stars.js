var _ = require('lodash');
var PoCircle = require('../Points on Circles/Points-on-Circles');
var ArrayF = require('../Array Functions/Array-Functions');

var points = function(centerX, centerY, radiusOuter, radiusInner, numberOfTips, startAngle){
  var pointsAround;

  pointsAround = _.curry(PoCircle.equidistantPoints)(numberOfTips, centerX, centerY)
  return ArrayF.zipmix(
    pointsAround(radiusOuter, startAngle),
    pointsAround(radiusInner, startAngle + (360/numberOfTips)/2)
  )
};
