export function allUnorderedCombinations(arr1, arr2){
  if (arr1.length == 0){
    return [];
  } else {
    return arr2.map(function(x){return [arr1[0], x]})
               .concat(allUnorderedCombinations(arr1.slice(1), arr2))
  }
}

export function allCombinationsOfZerosAndOnes(length){
  let result = ['0', '1'];
  for (var i=0; i<length-1; i++){
    var r1 = result.map(function(x){return x + '0'});
    var r2 = result.map(function(x){return x + '1'});
    result = r1.concat(r2);
  }
  return result;
}