import { relMouseCoords } from 'db82-element-click-coordinates';

export function MouseProxy(element){
	var self;
	self = this;

	this.position = [NaN, NaN];
  this.clickCount = 0;
  this.down = false;
  this.mouseInElementArea = false;

	element.addEventListener('mousemove', function(e){
		var c;

		c = relMouseCoords(e)
		self.position[0] = c[0];
		self.position[1] = c[1];
	})
  element.addEventListener('mousedown', function(e){
		self.clickCount += 1;
		self.down = true;
	})
  element.addEventListener('mouseup', function(e){
		self.clickCount += 1;
		self.down = false;
	})
}
