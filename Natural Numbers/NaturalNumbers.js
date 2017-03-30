/*
var max = (config && config.max) || 1000
var min = (config && config.min) || 0
var not = (config && config.not) || []
var noMultipleOf = (config && config.noMultipleOf) || []
var coprime = (config && config.coprime) || [] TEILERFREMD
var prime = config && config.prime
var notPrime = config && config.notPrime
var maxPrimefactor = config && config.maxPrimefactor
var minPrimefactor = config && config.minPrimefactor
*/

It can be advantageous to filter "noMultipleOf" and "multipleOf" etc. to include only the smallest numbers needed (e.g. if noMultipleOf=[2,3,4,9] then this is equivalent to [2,3])
1 determine the range (using min and max)
2 choose random number in that range
3 test this number if it is in "not" if yes then take the next one and start with 1
4 test  this number if it is a multiple of one number in "noMultipleOf" if yes then



Natural
       .not().equal(5,62,56) // x === 5 && x === 62 && x == 56
       .greaterThan(432) // x > 432
       .not().greaterThan(123456) // x < 123456
       .multipleOf(23, 43) // x % 23 === 0 && x % 43 === 0
       // ist das äquivalent zu (x % lcm(23,43) === 0), denke schon ...
       // ist das schneller?
       .not().multipleOf(11,65) // x % 11 !== 0 && x % 65 !== 0
       // ist das äquivalent zu (x % lcm(11,65) !== 0), nein!
       // denn hier sind die Zahlen ja "oder"-verknüpft
       // ab wann lohnt es sich die Primfaktorzerlegung zu erzeugen/speichern?
       .coprimeWith(453,3234,232) // x.gcd(453) === 1 && x.gcd(3234) === 1 && x.gcd(232) === 1
       .not().coprimeWith(21,5) // x.gcd(21) !== 1 && x.gcd(5) !== 1
       .squareFree(true)
       .cubeFree(true)
       .numberOfPrimeFactors().greaterThan(3)
       .numberOfPrimeFactors().not().greaterThan(13)
       .divisorOf(128864729021,3467862736782678733)


/*
  Die Methoden von Natural erzeugen jeweils ein neues Objekt
  und bilden ein Prädikat
  wird Natural dann aufgerufen liefert es eine zufällig gewählte Zahl
  auf die das Prädikat passt
*/

predicate = {
  equal :       (x,y) => x === y,
  greatherThan: (x,y) => x > y,
  multipleOf:   (x,y) => x % y === 0,
  coprimeWith:  (x,y) => gcd(x,y) === 1
}
