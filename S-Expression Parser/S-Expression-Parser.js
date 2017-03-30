//________________________________________________________________

var relationsMap = {
  '=': {
    name: 'equation',
    solve: function(n, m){
      return n === m;
    },
    jsExpression: function(n, m){
      return '(' + n + ' === ' + m + ')';
    }
  },
  '*': {
    name: 'multiplication',
    solve: function(n, m){
      return n * m;
    },
    jsExpression: function(n, m){
      return '(' + n + ' * ' + m + ')';
    },
    inverse: [':' , function(x){return x === 0}]
  },
  '+': {
    name: 'addition',
    solve: function(n, m){
      return n + m;
    },
    jsExpression: function(n, m){
      return '(' + n + ' + ' + m + ')';
    },
    inverse: ['-' , function(x){return true}]
  },
  '-': {
    name: 'subtraction',
    solve: function(n, m){
      return n - m;
    },
    jsExpression: function(n, m){
      return '(' + n + ' - ' + m + ')';
    },
    inverse: ['+' , function(x){return true}]
  },
  ':': {
    name: 'division',
    solve: function(n, m){
      return n / m;
    },
    jsExpression: function(n, m){
      return '(' + n + ' / ' + m + ')';
    },
    inverse: ['*' , function(x){return true}]
  },
  '^': {
    name: 'power',
    solve: function(n, m){
      return Math.pow(n, m);
    },
    jsExpression: function(n, m){
      return 'Math.pow(' + n + ', ' + m + ')';
    }
  },
  'sqrt': {
    name: 'square-root',
    solve: function(n){
      return Math.sqrt(n);
    },
    jsExpression: function(n, m){
      return 'Math.sqrt(' + n + ')';
    }
  }
}
//________________________________________________________________
function tokenizeString(str){

}
function transformString(str, variables){
  var infixOperators, number;
  //1 +2 3+4 +5 +6
  infixOperators = '^ * : + - '.split(' ');
  number = /-?[0-9][0-9]*?\.?[0-9]*?/;
  variables = variables || 'abcdefghijklmnopqrstuvwxyz'.split('');
}
//________________________________________________________________
function lispStringContainsFreeVariableString(str){
  //"free" means sthg like "abc" instead of "(abc)"
  return /\s([a-zA-Z][a-zA-Z0-9]*?)([\s|)])/.test(str)
}
function lispStringContainsFreeNumberString(str){
  return /\s(-?[\d.]+?)([\s|)])/.test(result)
}
function parseTree(str){
/*
  assumes
  parentheses are balanced
  no escaped parentheses
  spaces come only as separators
*/
  var result;

    result = str;
    while (lispStringContainsFreeVariableString(result) || lispStringContainsFreeNumberString(result)){
      result = result.replace(/\s([a-zA-Z][a-zA-Z0-9]*?)([\s|)])/g, ' ($1)$2')
                     .replace(/\s(-?[\d.]+?)([\s|)])/g, ' ($1)$2');
    }
    result =  result
      .replace(/</g, 'less')
      .replace(/>/g, 'greater')
      .replace(/\(([a-zA-Z][a-zA-Z0-9]*?)\)/g, '<variable name="$1"></variable>')
      .replace(/\(([a-zA-Z_\-\*\+\^=][0-9a-zA-Z_\-\*\+\^=]*?)[\s(]/g, function(m, p1){
        return '<relation type="' + p1 + '">'})//relationsMap[p1].name + '">'})
      .replace(/\((-?[\d.]+?)\)/g, '<number value="$1"></number>')
      .replace(/\)/g, '</relation>');

    return $(result);
  }

//_____________________________________________________________________

function getNodeFromMultiIndex(node, mindex){
  var i, node;

  node = $(node);
  if (mindex[0] === -1) return node;
  for (i = 0; i< mindex.length; i++){
    if ($(node)[0]){
      node = $(node)[0].children[mindex[i]];
    } else {
      return undefined;
    }
  }

  return node;
}

function generateAllMultiindeces(tree){/*Multiindex for each and every fucking node in the tree!*/
  var result, cIndex, cNode;

  result = []
  cIndex = [0]
  cNode = getNodeFromMultiIndex(tree, cIndex)
  while (cIndex.length){
    while (cNode){
      result.push(cIndex)
      cIndex = cIndex.concat([0])
      cNode = getNodeFromMultiIndex(tree, cIndex)
    }
    cIndex.splice(-1,1)
    cIndex[cIndex.length-1] += 1
    cNode = getNodeFromMultiIndex(tree, cIndex)
  }
  return result;
}

function getMultiindexForNode(treeRoot, node){
  var cNode, result;

  cNode = $(node);
  result = [];
  if (cNode[0] === $(treeRoot)[0]) return [-1]
  while (cNode[0] !== $(treeRoot)[0] ){
    result.splice(0, 0, cNode.prevAll().length);
    cNode = $(cNode.parent());
  }
  return result;
}
//_____________________________________________________________________
function walkTreeDownwards(tree, func){
  var mi, cancel, i;

  mi = [[-1]].concat(generateAllMultiindeces(tree)).sort(function(a,b){if(b.length && a.length) return b.length < a.length})
  cancel = {shouldCancel: false};
  for (i = 0; i<mi.length; i++){
    if (cancel.shouldCancel) break;
    func(getNodeFromMultiIndex(tree, mi[i]), mi[i], cancel, mi)
  }
}
//_____________________________________________________________________

function getTreeStructure(tree){//BRAUCH ICH DAS ÜBERHAUPT FÜR IRGENDWAS?
  if (!$(tree)[0].children.length) return []
  return Array.prototype.slice.call($(tree)[0].children, 0).map(function(x){return getStructure(x)})
}

function getTreeDepth(tree){
  return Math.max.apply(Math, getTreeStructure(tree).map(function(x){return x.length}))
}
//_____________________________________________________________________
//NODE COMPARISON FUNCTIONS
function areSame(n1, n2){
  return $(n1)[0] === $(n2)[0]
}
function areEqual(n1, n2){
  return $(n1)[0].outerHTML === $(n2)[0].outerHTML
}
function areEquivalentAccordingToRule(){
  /*one can be transformed so that they are equal*/
}
//_____________________________________________________________________
function parseConstraints(listOfConstraints){
  var result;

  result = {}
  /*
    a constraint looks like (≤ y 0)
    but could also be (= (+ x y) 1)
    so basically you have to evaluate an equation
    for the variable in question....hm

    aber wie wird das dann benutzt?
    also nehmen wir an, es soll gelten (≤ y 0)
    wunderbar wenn y eine zahl ist, dann lässt sich das prüfen
    was aber wenn es eine variable ist?
    dann müssten man zwei Bäume machen, in dem einen wird die
    Rewriterule angewandt (angenommen ist, dass (≤ y 0) gilt)
    in dem anderen nicht (angenommen ist, dass (≤ y 0) nicht gilt)
    der eine baum hat dann die bedingung, dass (≤ y 0)
    der andere das nicht
    und wenn y eine relation ist? dann wird das alles viel komplizierter oder?
    und wenn der constraint selbst komplexer wird?
    eieieiiei
    vielleicht erstmal schauen wie komplex die constraints bei mir sind,
    also bei den fällen, die ich tatsächlich habe
    da ist auf jeden Fall der (≠ y 0)-constraint dabei
    und das zwei bäume problem hab ich damit dann auch
  */
  listOfConstraints.map(function(x){return parseTree(x)})
                   .forEach(function(x){
                     //result[nameEinerPatternVariable] = [liste, von, constraintFunktionen
                   //oder eine große contraintfunktion für diese variable]
                     result[]
                   })
  return result;
}
//_____________________________________________________________________

function parsePattern(pattern){
  var vc, a, pv;

  pattern = pattern.split(',');
  vc = parseConstraints(pattern.slice(1));
  pattern = pattern[0];
  a = parseTree(pattern)
  pv = {}
  $(a).find('variable')
      .map(function(i, x){return $(x).attr('name')})
      .each(function(i, x){pv[x] = null})
  return {
    pattern: a,
    patternVariables: pv,
    variablesConstraints: vc
  }
}

function makeNodeFromPattern(pattern, patternVariables){
  var result;

  result = $($(pattern.pattern)[0].outerHTML)
  Object.keys(patternVariables)
        .forEach(function(x){
          if ($(result).is('variable[name="' + x + '"]')){
            result = $(patternVariables[x])[0]
          }
          $(result).find('variable[name="' + x + '"]')
                   .replaceWith(patternVariables[x])

        })

  return result;
}
//_________________________
function transformNodeAccordingToRule(node, rule){
  var pv, pp;
  //rule === [patternToBeMatched, patternToBeInstatiated]
  //!!!!!!!!!breücksichtigt noch nicht constraints wie (≠ x 0) etc.
  if (matchesPattern(node, rule[0])){
    pv = getMatchedPattern(node, rule[0]).patternVariables
    pp = makeNodeFromPattern(rule[1], pv)
    return pp;
  }
  return node
}

function applyRuleToTree(r, tree){
  var stopFlag;

  stopFlag = false;
  while (!stopFlag){
    //!!!!!!!!!!das hier ist endlos wenn rule[0] und rule[1] isomorph sind
    // also zB '(+ x y) === (+ y x)'
    walkTreeDownwards(tree, function(b,c,d,e){
      if (c === e[e.length-1]){
        stopFlag = true;
      }
      if (matchesPattern(b, r[0])){
        d.shouldCancel = true;
        $(b).replaceWith(transformNodeAccordingToRule(b,r))
        stopFlag = false;
      }
    })
  }
}
//________________________________________________________________
//PATTERN MATCHING FUNCTION

function getKindOfNode(node){
  var name = $(node)[0].nodeName.toLowerCase();
  if (name === 'relation'){
    return $(node).attr('type')
  }
  if (name === 'variable'){
    return 'variable'
  }
  if (name === 'number'){
    return 'number'
  }
}

function matchesRelationsPattern(tree, pattern){
  var mi;

  mi = [[-1]].concat(generateAllMultiindeces(pattern.pattern));
  return  mi.map(function(x){return [getNodeFromMultiIndex(pattern.pattern, x),getNodeFromMultiIndex(tree, x)]})
            .filter(function(x){return $(x[0])[0].nodeName === 'RELATION'})
            .every(function(x){
                return getKindOfNode(x[0]) ===  getKindOfNode(x[1]);
            })
}

function matchesVariablePattern(tree, pattern){
  return Object.keys(pattern.patternVariables)
        .map(function(x){return $(pattern.pattern).find('variable[name="' + x + '"]').toArray()})
        .map(function(x){return x.map(function(y){return getMultiindexForNode(pattern.pattern, y)})})
        .map(function(x){return x.map(function(y){return getNodeFromMultiIndex(tree, y)})})
        .every(function(x){return x.every(function(y){return areEqual(x[0], y)})});
}
function matchesNumberPattern(tree, pattern){
  return $(pattern.pattern).find('number').toArray()
        .map(function(y){return getMultiindexForNode(pattern.pattern, y)})
        .every(function(y){
          if(getNodeFromMultiIndex(tree, y)){
            return  $(getNodeFromMultiIndex(pattern.pattern, y)).attr('value') === $(getNodeFromMultiIndex(tree, y)).attr('value')
          }
          return false
        })
}

function matchesArities(tree, pattern){
  return $(pattern.pattern).find('relation').toArray()
        .map(function(y){return getMultiindexForNode(pattern.pattern, y)})
        .every(function(y){
          if(getNodeFromMultiIndex(tree, y)){
            return  $(getNodeFromMultiIndex(pattern.pattern, y))[0].children.length === $(getNodeFromMultiIndex(tree, y))[0].children.length
          }
          return false
        })
}
function matchesVariableConstraints(tree, pattern){

}

function matchesPattern(tree, pattern){
    return matchesRelationsPattern(tree, pattern)
            && matchesVariablePattern(tree, pattern)
            && matchesArities(tree, pattern)
            && matchesNumberPattern(tree, pattern);
}

function getMatchedPattern(tree, pattern){
  var result = {
    pattern: $($(pattern.pattern)[0].outerHTML),
    patternVariables: {},
    variablesConstraints: pattern.variablesConstraints
  }
  if (matchesPattern(tree, pattern)){
    Object.keys(pattern.patternVariables)
          .map(function(x){return [x, $(pattern.pattern).find('variable[name="' + x + '"]').toArray()]})
          .map(function(x){return [x[0], x[1].map(function(y){return getMultiindexForNode(pattern.pattern, y)})]})
          .map(function(x){return [x[0], x[1].map(function(y){return getNodeFromMultiIndex(tree, y)})]})
          .map(function(x){return [x[0], x[1][0]]})
          .forEach(function(x){
            result.patternVariables[x[0]] = x[1]})
    return result;
  }
}
//________________________________________________________________
function parseRewriteRule(str){
  return str.split('//')[0].split(/\s*?->\s*?/).map(parsePattern);
}
//________________________________________________________________
function isInteger(n){
  return n === (n |0);
}
function isNatural(n){
  return isInteger(n) && n > 0;
}
function isNatural_0(n){
  return isInteger(n) && n > 0 || n === 0;
}
function isInOpenInterval(s, e, n){
  return n > s && n < e
}
function isInClosedInterval(s, e, n){
  return isInOpenInterval(s, e, n) || n === s || n ===e;
}
function isInLeftOpenInterval(s, e, n){
  return isInOpenInterval(s, e, n) || n === e;
}
function isInRightOpenInterval(s, e, n){
  return isInOpenInterval(s, e, n) || n === s;
}
//________________________________________________________________

function setVariable(varname, expression, branch){
  if (typeof expression === typeof 1){
    expression = '<number value="' + expression + '"></number>'
  }
  $(branch).find('variable[name="'+ varname +'"]')
           .replaceWith($(expression))
}

function evaluateToJS(tree){
  if ($(tree).is('relation')){
    return relationsMap[$(tree).attr('type')].jsExpression.apply(this, $(tree).children().map(function(i,x){ return evaluateToJS(x)}));
  }
  if ($(tree).is('number')){
    return $(tree).attr('value');
  }
  if ($(tree).is('variable')){
    return $(tree).attr('name');
  }
}

function solve(tree){
  if ($(tree).is('relation')){
    return relationsMap[$(tree).attr('type')].solve.apply(this, $(tree).children().map(function(i,x){ return solve(x)}));
  }
  if ($(tree).is('number')){
    return +$(tree).attr('value');
  }
}
function toString(tree){
    if ($(tree).is('relation')){
      return '(' + getKindOfNode(tree) + ' ' + Array.prototype.splice.call($(tree).children().map(function(i,x){ return toString(x)}), 0).join(' ') + ')';
    }
    if ($(tree).is('number')){
      return $(tree).attr('value');
    }
    if ($(tree).is('variable')){
      return $(tree).attr('name');
    }
}
//________________________________________________________________

function wrapTree(tree){
  return $('<relation type="wrap">' + $(tree)[0].outerHTML + '</relation>')[0]
}
function stripTree(tree){
  if ($(tree).is('relation[type="wrap"]')){
    return $(tree)[0].children[0]
  }
  return tree
}
//__________________________________________________
function applyRulesToTree(tree, rules){
  rules = rules.split(/\n/g).filter(function(x){return x.length > 2}).map(parseRewriteRule);
  tree = parseTree(tree)
  tree = wrapTree(tree)//das muss gemacht werden, weil es momentan absolut sonst nicht funktioniert wenn das gematchte pattern der rootnode ist
  rules.forEach(function(x){
    applyRuleToTree(x, tree)
  })
  tree = stripTree(tree)//das muss gemacht werden, weil es momentan absolut sonst nicht funktioniert wenn das gematchte pattern der rootnode ist
  return tree
}
var n = Date.now()


var t = `(= (+ 2 (- a -1)) (* (+ 4 c) (- b b)))`
console.log(t)

var a = applyRulesToTree(t, `
(- x y)        -> (+ x (* -1 y))       //
(+ x (* -1 x)) -> (0)                  //
(* x 0)        -> (0)
(+ y 0)        -> (y)
(* x (+ y z))  -> (+ (* x y) (* x z))  //Distribuity
(* -1 -1)      -> (1)
(* x 1)        -> (x)
`)//'(= (+ 1 (- (* 2 (^ (- 7 z) 3)) 9)) (+ 4 (- (* 34 (^ (- 7 x) 3)) 9)))')//('(^ (+ (* 12 3) x) 2)')
console.log(toString(a))


/*

!!!!!!
ACHTUNG
wenn mehrere operanden erlaubt sind, dann kann beim pattern matchen was schieflaufen
nämlich wenn das pattern n operanden erwartet, der knoten n+1 hat,
dann gibt das ding eventuell zurück, dass es matchet weil der letzte einfach ignoriert wird
!!!!!!!
also das muss noch implementiert werden
und das constraints beachtet werden wie y>0 oder y eine relation

danach dann kanonische ordnung zB  bei * und + immer zuerst die Zahlen dann die variablen
dann relationen und auch in ner bestimmten ordnung

*/

console.log('took: ', Date.now() - n)
/*
a+b+v+c+b
= (+ (+ (+ (+ a b) v) c) b)
= (+ (+ (+ (+ b v) a) c) b)
= (+ (+ (+ (+ v a) b) c) b)
= (+ (+ (+ b c) (+ v a)) b)
= (+ (+ (+ c (+ v a)) b) b)
= (+ (+ b b) (+ c (+ v a)))
= (+ (* 2 b) (+ c (+ v a)))
= v + a + c + 2b

a+b+v*c+b
= (+ (+ a (+ b (* v c)) b)*/
/*3 + 4 + 5 = ((3 + 4) + 5) = (+ (+ 3 4) 5)
3 + 4 * 5 = (3 + (4 * 5)) = (+ 3 (* 4 5))
3 * 4 + 5 = ((3 * 4) + 5) = (+ (* 3 4) 5)*/
/*
  Äquivalenzumformung
  ===================
  (^ x y) => (number x) || (unknown x)
  (unknown x) => (E! x (* x y))

reduce number of variable occurences
reduce number of number occurences
move all variable occurences to one side of equation
move all non-variable occurences to other side of equation


move to deepest place in the tree
try to simplify it (reduce relation to number or variable)
move one step upwards
try to simplify it (reduce relation to number or variable, or move variable to the right, or .....)
if it doesnt work transform it (keep track of transformations so you recognize when you repeat yourself)
try to simplify it
if all transformations are tried and it's still not simpler move one step upwards
repeat

hm bei der implemntation vllt erstaml nur mit addition arbeiten

function nodeHadThisFormAlready

syntax für transformationsregeln ...

  (= x y) === (= y x)
  (= (+ x y) z) === (= x (- z y))
  (= (* x y) z), (≠ y 0) === (= x (: z y))

  (^ (root x y) y) === x
  (root (^ x y) y) === x

  (^ (* x y) z) === (* (^ x z) (^ y z))
  (^ (+ x y) z), (∊ z N), (> z 1) === (* (+ (+ (* x x) (* x y)) (* y x) (* y y)) (^ (+ x y) (- z 2)))
  (^ x z), (∊ z N) === (* (* x x) (x (- z 1)))
  (^ x z), (∊ z Z), (< z 0) === (^ (: 1 x) z)
  (^ x 0) === 1

  (* x 0) === 0
  (* x 1) === x
  (* (* x y) z) === (* (* y z) x)
  (* x y) === (+ x (* x (- y 1)))
  (* (+ x y) z) === (+ (* x z) (* y z))
  (* x y) === (* y x)
  (* (: x y) y) === x

  (+ (+ x y) z) === (+ (+ y z) x)
  (+ x y) === (+ y x)
  (+ x 0) === x
  (+ (- x y) y) === x

  (- x y) === (+ x -y)

*/
/*
makeFunctionThat({
  solves: `x + 2b = a`,
  for: 'x',
  given: ['a', 'b'],
  returning: 'x'
})

==>

function (a, b){
  return a - 2 * b;
}
*/
