var _ = require('lodash');
/*
 "a+c-(e+(t+3)-ec)c-a+2*(8-9)" ->  ["a+c-", "e+(t+3)-ec","c-a+2*", "8-9"]
 "call (a list of arguments of which one is a '(');" -> ["call", "a list of arguments of which one is a '('", ";"]
 "er sagte '\'tralala\' sagte er'" -> ["er sagte", "\'tralala\' sagte er", ""],
*/
function offsetIndex(offset){
  return function(indexObject){
    return {
      start: indexObject.start + offset,
      end: indexObject.end + offset
    }
  };
};

function regExFor(regExStr, escape){
  return new RegExp(`(^|[^${escape}])${regExStr}`, `g`);
};

function numberOfOccurences(regExStr, escape, str){
  //Bei regExStr muss escapeKacke gemacht werden ... also ""\\\\" statt "\\"
  var regEx;

  regEx = regExFor(regExStr, escape);
  return (str.match(regEx) || [])
             .length;
};

function isBalanced(opener, closer, escape, str){
  /*
    ist eigentlich zu einfach gedacht
    könnte ja auch sowas wie "jfnvjd) nusdncus(" sein ...
  */
  var countOf;

  countOf = _.curryRight(numberOfOccurences)(str)(escape)
  return countOf(opener) === countOf(closer)
};

function indexOfFirstOccurence(regExStr, escape, str){
  var regEx, found, escapeLength;

  regEx = regExFor(regExStr, escape);
  found = regEx.exec(str);
  escapeLength = found ? found[1].length : 0;

  return (found) ? {
    start: found.index + escapeLength,
    end: regEx.lastIndex
  } : null;
};

function indecesOfOccurences(regExStr, escape, str){
  var indexOfNextOccurence;

  indexOfNextOccurence = indexOfFirstOccurence(regExStr, escape, str)
  if (!indexOfNextOccurence){
    return [];
  } else {
    return [indexOfNextOccurence]
              .concat(indecesOfOccurences(regExStr, escape, str.slice(indexOfNextOccurence.end))
                      .map(offsetIndex(indexOfNextOccurence.end)))
  }
};

function isFittingCloserForFirstOpener(indecesOfOpeners, indecesOfClosers){
  return function(x, i){
    if (i < indecesOfOpeners.length-1){
      return indecesOfClosers[i].start < indecesOfOpeners.slice(1)[i].start;
    } else {
      return true
    }
  }
};

function firstOutermost(opener, closer, escape, str){
  var indecesOfOpeners, indecesOfClosers, indexOfFirstOpener, indexOfFittingCloser;

  indecesOfOpeners = indecesOfOccurences(opener, escape, str);
  indecesOfClosers = indecesOfOccurences(closer, escape, str);
  indexOfFirstOpener = indecesOfOpeners[0];
  indexOfFittingCloser = _(indecesOfClosers)
                            .find(isFittingCloserForFirstOpener(indecesOfOpeners, indecesOfClosers));

  return (![indexOfFirstOpener, indexOfFittingCloser].some(_.isUndefined))
          ? [str.slice(0, indexOfFirstOpener.start),
          str.slice(indexOfFirstOpener.start, indexOfFirstOpener.end),
          str.slice(indexOfFirstOpener.end, indexOfFittingCloser.start),
          str.slice(indexOfFittingCloser.start, indexOfFittingCloser.end),
          str.slice(indexOfFittingCloser.end)
          ]
          : [str];
};

function outermost(opener, closer, escape, str){
  var fo;

  fo = firstOutermost(opener, closer, escape, str)
  if (fo.length === 1){
    return fo;
  } else {
    return fo.slice(0,fo.length-1)
             .concat(firstOutermost(opener, closer, escape, fo[fo.length-1]))
             .filter(function(x){return x.length})
  }
};

function doesContain(opener, escape, str){
  return regExFor(opener,escape).test(str) && !(new RegExp(`^${opener}$`)).test(str)
};

function protoTree(opener, closer, escape, str){
  return outermost(opener, closer, escape, str)
          .map(function(x){
            if (!doesContain(opener, escape, x)){
              return x;
            } else {
              return protoTree(opener, closer, escape, x);
            }
          })
};

function makeHighNodes(opener, closer, escape, arr){
  var result;

  if (!regExFor(opener,escape).test(arr[0])){
    result = [{inner: arr[0]}];
  } else {
    result = [{opener: arr[0], inner: arr[1], closer: arr[2]}];
    //ACH KACKE DANN MÜSSEN JA JETZT ABER ARR[1] und ARR[2] WEG!
    //ne dann muss das erst gechunkt werden ...............
  }
  if (arr.length <= result.length){
    return result;
  } else {
    return result
      .concat(makeNodes(opener, closer, escape, arr.slice(result.length)));
  }
};

function makeNodes(opener, closer, escape, arr){
    return makeHighNodes(opener, closer, escape, arr)
      .map(function(x){
      if (!_.isArray(x.inner)){
        return x;
      } else {
        return makeNodes(opener, closer, escape, x);
      }
    })
};

function tree(opener, closer, escape, str){
    return makeNodes(opener, closer, escape, protoTree(opener, closer, escape, str));
}
