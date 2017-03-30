export class AnimationCanvas{
  private canvas;
  private currentTime;
  private handlers;
  private requestID;

  constructor(canvas){
    this.canvas = canvas;
    this.currentTime = 0;
    this.handlers = [];
    this.requestID = undefined;
  }

  addHandler(handler){
    this.handlers.push(handler);
  }

  removeHandler(handler){
    this.handlers.splice(this.handlers.indexOf(handler), 1);
  }

  draw(){
    var self = this;
    this.handlers.forEach(function(f){f(self.currentTime);})
    this.currentTime += 1;
    this.requestID = requestAnimationFrame(self.draw.bind(self))
  }

  pause(){
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
      this.requestID = undefined;
    }
  }

  resume(){
    this.draw();
  }

  toggle(){
    if (this.requestID) {
      this.pause();
    } else {
      this.resume();
    }
  }
}