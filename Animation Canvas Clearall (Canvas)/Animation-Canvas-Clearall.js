var Can = require('../Canvas Forms (Canvas)/Canvas-Forms');
var StateContainer = require('../Animation State Container/Animation-State-Container');
var AnimationCanvas = require('../Animation Canvas (Canvas)/Animation-Canvas')

function Animator(canvasElement, stateContainer, drawingObject){
  var self;

  self = this;
  this.canvas	        = drawingObject || new Can(canvasElement);
  this.stateContainer = stateContainer || new StateContainer();
  this.animation      = new AnimationCanvas(canvasElement);
  function handler(currentTime){
    self.canvas.clearAll()
    self.stateContainer.draw();
    self.stateContainer.update()
  };
  anim.addHandler(handler);
  anim.draw();
};
