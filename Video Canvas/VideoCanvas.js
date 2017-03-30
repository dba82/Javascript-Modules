var _ = require('lodash')
function VideoCanvas(canvas, videoUrl){
  var ctx, self, c, cctx;

	self = this;
	this.canvas = canvas;
	this.handlers = [];
	this.video = document.createElement('video');

  this.ctx = canvas.getContext('2d')
  this.video.src = videoUrl;

	 c = document.createElement('canvas');
	 c.width = this.canvas.width;
	 c.height = this.canvas.height;
	 cctx = c.getContext('2d')

  function draw(b){
		var t;
	log(b)
		cctx.drawImage(self.video, 0, 0, self.canvas.width, self.canvas.height)
		t = b(cctx.getImageData(0, 0, self.canvas.width, self.canvas.height))

		self.ctx.putImageData(t, 0, 0);
    window.requestAnimationFrame(function(){draw(b)});
		//setTimeout(draw, 20, b)
  }
  this.video.addEventListener('play', function(){
		var b;

    b = _.flow.apply(self, self.handlers).bind(self);
    draw(b);
  })
}
VideoCanvas.prototype.addHandler = function(f){
	this.handlers.push(f)
}
