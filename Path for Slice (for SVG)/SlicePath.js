var Path = require('Path');
var Coord = require('CoordinateTransformations');
var _ = require('lodash');
/*
Das wäre viel schöner, wenn SlicePath selbst ein Path-Objekt wäre
und wenn es den Bogen und die geöffneten Schenkel auch einzeln gäbe

ODER: vielleicht noch besser als Mixin zu Path!!
*/
function describeArc(centerX, centerY, radius, startAngle, endAngle){
    var start, end, arcSweep, pointFor;

    pointFor = _.curry(Coord.polarToCartesian)(centerX, centerY, radius);
    start = pointFor(endAngle);
    end = pointFor(startAngle);
    arcSweep = (endAngle - startAngle <= 180)
               ? "0"
               : "1";
    return new Path()
        .moveTo(centerX, centerY)
        .lineTo(start.x, start.y)
        .arcTo(end.x, end.y, radius, arcSweep)
        .closePath();
};
