var getArgumentNames = function (func){
  return func.toString()
             .split("(")[1]
             .split(")")[0]
             .split(",")
             .map(Function.call, String.prototype.trim) //warum diese seltsame Konstruktion? Deshalb: https://nemisj.com/some-interesting-aspects-of-call-method-in-javascript/
             .filter(function(x){return x.length})
};

var makeDefaultArguments = function(defaultArguments, func){
  return function(){
    var passedArguments, args;

    passedArguments = arguments;
    args = getArgumentNames(func)
      .map(function(name, index){
        return (passedArguments[index] === undefined)
          ? defaultArguments[name]
          : passedArguments[index]});
    return func.apply(undefined, args);
  }
};

var makeCheckedArguments = function(argumentPredicates, func){
  return function(){
    var passedArguments, args;

    passedArguments = arguments;
    args = Object
              .keys(argumentPredicates)
              .map(function(name){
                return {
                  index: argumentNames.indexOf(name),
                  name: name
                };
              })
              .filter(function(x){
                return !argumentPredicates[x.name](passedArguments[x.index]);
              });
    if (args.length){
      throw new Error(args
        .map(function(x){
          return "Argument '" + x.name + "' at position " + x.index
            + " does not meet the criterion:\n" + argumentPredicates[x.name].description
          })
        .join("\n\n"))
    } else {
      return func.apply(undefined, passedArguments);
    }
  }
};

var makeRequiredArguments = function (requiredArgumentNames, func){
  return function(){
    var passedArguments, argumentNames, notPassedArgumentIndexes;

    passedArguments = arguments;
    argumentNames = getArgumentNames(func);
    notPassedArgumentIndexes = requiredArgumentNames
      .map(argumentNames.indexOf.bind(argumentNames))
      .filter(function(i){
        return passedArguments[i] === undefined});
   if (notPassedArgumentNames.length){
      throw new Error("The following required Argument(s) was/were not provided:\n"
        + notPassedArgumentIndexes.map(function(i){
            return argumentNames[i] + ' at Position ' + i
            })
            .join("\n"));
    } else {
      return func.apply(undefined, passedArguments)
    }
  }
};

var makeArgumentsObject = function (func, argMap){
  var f;

  f = (argMap)
    ? function(x){return argMap[x] ? argMap[x] : x}
    : function(x){return x};
  return function(obj){
      return func.apply(undefined, getArgumentNames(func).map(function(x){return obj[f(x)]}))
  }
};

/*var myFunnyAnnotedFunction =
annotate
.required(
'input',
'requiredOtherInput'
)
.default({
'inputDefault': 'lala'
})
.typed({
'input': 'string',
'requiredOtherInput': 'number',
'someLastInput': function(x){return x > 12}
})
.namedArguments()
(function(input, requiredOtherInput, inputDefault, someLastInput){

})*/
