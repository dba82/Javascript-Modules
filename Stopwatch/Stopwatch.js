var Stopwatch = function Stopwatch(name){
  this.name = name || 'THE stopwatch';
  this.startTime = undefined;
  this.stopTime = undefined;
  this.laps = [];
  this.pauses = [];
};

Stopwatch.prototype.start = function(){
  if (!this.startTime){
    this.startTime = Date.now();
  } else {
    if (!this.stopTime){
      throw new Error(this.name + ' is already running!');
    } else {
      throw new Error(this.name + ' has already been stopped!');
    }
  }
};

Stopwatch.prototype.stop = function(){
  if (this.startTime){
    if (!this.stopTime){
      this.stopTime = Date.now();
    } else {
      throw new Error(this.name + ' has already been stopped!');
    }
  } else {
    throw new Error(this.name + ' has not been started!');
  }
};

Stopwatch.prototype.getDuration = function(){
  if (this.startTime){
    if (this.stopTime){
      return this.stopTime - this.startTime;
    } else {
      throw new Error(this.name + ' has not been stopped!');
    }
  } else {
    throw new Error(this.name + ' has not been started!');
  }
};
