var _ = require('lodash');

var arrayOfSize = function(size){
  return _.times(size, _.constant(null));
};

var zipmix = function(aCoupleOfArraysOfSameLength){
  var l, args;

  args = arguments;
  l = args[0].length * args.length;
      /*
      falls die Arrays unterschiedliche Länge haben, muss das hier benutzt werden
      _.toArray(arguments)
       .map(_.curryRight(_.get)(null)('length'))
       .reduce(function(a,b){return a+b})
       */
  return arrayOfSize(l)
          .map(function(x,i){
            return args[i % args.length][_.floor(i/args.length)]})
  };
