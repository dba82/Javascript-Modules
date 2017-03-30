import * as geo from 'db82-simple-geometry-shapes';
import * as img from 'db82-image-draw-functions';

export function Can(canvasElement){
  this.canvas = canvasElement;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  this.drawing = false;
  this.imgCache = {};
  this.drawing = false;
};

export function clearAll(ctx){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Can.prototype = {
  //GEHT SO VIEL SCHNELLER ALS MIT CURRY TARRARA
  /*
!!!!!!! HIER KANN ICH NOCH RICHTIG WAS RAUSHOLEN
SIEHE http://www.html5rocks.com/en/tutorials/canvas/performance/#toc-batch
draws und fills erstmal nur schedulen, dann optimale reihenfolge errechnen und erst bei einem
draw-commando zeichnen
  */
  background:     function(colorString){
    let tmp = this.ctx.fillStyle;
    this.ctx.fillStyle = colorString;
    this.ctx.fillRect(this.width, this.height);
    this.ctx.fillStyle = tmp;
  },
  polyline:       function(points){geo.polyline.bind(this)(this.ctx, points); return this},
  line:           function(points){geo.polyline.bind(this)(this.ctx, points).bind(this); return this},
  polygon:        function(points){geo.polygon.bind(this)(this.ctx, points); return this},
  regularPolygon: function(center, radius, numberOfVertices, startAngle){geo.regularPolygon.bind(this)(this.ctx, center, radius, numberOfVertices, startAngle); return this},
  clearAll:       function(){clearAll(this.ctx); return this},
  circle:       	function(center, radius){geo.circle.bind(this)(this.ctx, center, radius); return this},
  pointedCircle:  function(center, radius){geo.pointedCircle.bind(this)(this.ctx, center, radius); return this},
  imageFromUrl:   function(url, offSetPoint, w, h){
		img.imageFromUrl.bind(this)(this.ctx, url, offSetPoint, w, h);
    return this;
	},
  stroke:         function(){this.ctx.stroke(); this.drawing = false; return this},
  fill:           function(){this.ctx.fill(); this.drawing = false; return this}
}
