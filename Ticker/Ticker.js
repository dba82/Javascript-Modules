var Ticker = (function(){
  var Ticker = function(func, interval, timeoutFunc){
    if (!func){
      throw new Error ('No callback function is set!');
    } else {
      if (!interval){
        throw new Error ('No interval is set!');
      } else {
        this.timeoutFunc = timeoutFunc || setTimeout.bind(window || process);
        this.func = func;
        this.interval = interval;
        this._lastCallTime = undefined;
        this.stopped = false;
      }
    }
  };

  Ticker.prototype.run = function(){
    var overhead;
    if (!this.stopped){
      overhead =  (Date.now() - this._lastCallTime) - this.interval;
      overhead = overhead < 0 ? 0 : overhead;
      this.timeoutFunc(this.run.bind(this), this.interval - overhead);
      //console.log(this.interval - overhead)
      this.func();
      this._lastCallTime = Date.now();
    }
  };

  Ticker.prototype.pause = function(){
    this.stopped = true;
  };
  
  Ticker.prototype.unpause = function(){
    this.stopped = false;
    this.run();
  };
  return Ticker;
}())

var e = new Ticker(function(){console.log((Date.now() + '').substr(10))}, 1000)
e.run()

module.export = Ticker;
