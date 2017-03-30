var vect = require('../Vector Functions/Vector-Functions');
var _ = require('lodash');

function linear(start, end, numberOfPoints){
  var line, step;

  line = vect.subtract(end, start);
  step = vect.length(line)/(numberOfPoints + 1)
  return _.range(numberOfPoints)
          .map(function(n){return vect.add(start, vect.multiply(line, n * step))})
};
