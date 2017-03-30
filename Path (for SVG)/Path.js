var Path = function(){
	this._path = [];
	return this;
};

Path.prototype.toString = function(){
	return this._path.join(" ");
};

Path.prototype.moveTo = function(x,y){
	this._path = this._path.concat(["M", x, y]);
	return this;
};

Path.prototype.arcTo = function(x, y, radius){
	this._path = this._path.concat(["A", radius, radius, 0, 0, 0, x, y]);
	return this;
};

Path.prototype.bezierTo = function(x1, y1, x2, y2, x, y){
	if (x === undefined){// dann ist es eine quadratische BezierKurve
		this._path = this._path.concat(["Q", x1, y1+',', x2, y2]);
	} else {
		this._path = this._path.concat(["C", x1, y1+',', x2, y2+',', x, y]);
	}
	return this;
};

Path.prototype.lineTo = function(x,y){
	this._path = this._path.concat(["L", x, y]);
	return this;
};

Path.prototype.closePath = function(){
	this._path.push("Z");
	return this;
};

Path.prototype.draw = function(){
	return this._path.join(' ');
};
