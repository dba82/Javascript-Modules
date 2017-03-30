var MAX_CAPACITY = 999999999;
/*
2 0 2 9
2 0 2 4
1 1 3
1 2 1
1 1 5
1 2 6
2 2 7 8
1 0 6
1 0 9
0
*/
var instructionMap = {

	'+'   : 'increment',
	'inc' : 'increment',
	'1'	  : 'increment',
	'dec' : 'decrement',
	'-'   : 'decrement',
	'2'   : 'decrement',
	'end' : 'end',
	'0'   : 'end',
	'.'   : 'end'
}

function Register(name, capacity, state){
	this.name = name;
	this.capacity = capacity || MAX_CAPACITY;
	this.state = state || 0;
}

Register.prototype.increment = function(){
	console.log("increment register " + this.name)
	this.state = this.state + 1 < this.capacity ? this.state + 1 : this.state
}

Register.prototype.isFull = function(){
	return this.capacity ? this.state + 1 === capacity : false
}

Register.prototype.isEmpty = function(){
	return this.state === 0
}

Register.prototype.decrement = function(){
	console.log("decrement register " + this.name)
	this.state = !this.isEmpty() ? this.state - 1 : this.state
}
function registermachine($timeout){
function Registermachine(noRegisters, capacity, states){
  this.registers = []
  this.program = []
  this.step = 0
  this.cycle = 0
  this.speed = 1

  for (var i=0; i<noRegisters; i++){
    this.registers.push(new Register(i, capacity))
  }
}

Registermachine.prototype.load = function(programString){
  var commandStrings = programString.split(/(\n|;)/g)
  var commands = commandStrings.map(function(x){
    var result = {}
    var parts = x.split(/#/)
    if (parts[1]){
      result.comment = parts[1].trim() || undefined
    }
    var command = parts[0].trim()
    command = command.split(/\s+/)
    result.instruction = instructionMap[command[0].toLowerCase()]
    result.register = command[1]
    if (command[2]){
      result.go = command[2]
      if (command[3]){
        result.branch = command[3]
      }
    }
    return result
  }).filter(function(x){
    return x.instruction ? x.instruction.length : false
  })
  this.program = commands
}

Registermachine.prototype.execute = function(){
  if (this.step || this.step === 0){
    var command = this.program[this.step]
    if (command.instruction === 'end'){
      this.stop()
      this.step = undefined
    } else {
      this.registers[command.register][command.instruction]()
      this.step = this.registers[command.register].isEmpty() && command.branch ? command.branch : command.go
    }
    this.cycle += 1
  }
}

Registermachine.prototype.run = function(){
  var that = this
  speed = 1*1000/(this.speed)
  $timeout(function(){
    if (!that.stopped){
      that.execute()
      that.run(speed)
    }
  }, speed)
}

Registermachine.prototype.stop = function(){
  this.stopped = true
}

Registermachine.prototype.reset = function(){
  this.step = 0
  this.stopped = false

}

  return new Registermachine(10)
}
