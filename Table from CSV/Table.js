var _ = require('lodash')

var Table = function(csvStringOrTableData){
	if (typeof csvStringOrTableData === typeof "String"){
		this.lines = csvStringOrTableData
			.trim()
			.split("\r?\n")
			.map(function(y){return y.split(";")})
			//so geht das nicht, Semikolons in zitierten Bereichen dürfen ja nciht zählen 
			.map(function(y){return y.replace(/(^"|"$)/g, "")})
	} else {
		this.lines = csvStringOrTableData
	}
};

Table.prototype.getLine = function(n){
	return this.lines[n]
};
Table.prototype.getColumn = function(n){
	return _.flatten(this.lines.map(function(x){return x[n]}))
};
Table.prototype.getNumberOfLines = function(n){
	return this.lines.length;
};
Table.prototype.getNumberOfColumns = function(n){
	return Math.max.apply(null, this.lines.map(function(x){return x.length})
};
Table.prototype.getCell = function(l,c){
	return this.lines[l][c]
};
Table.prototype.getNormalized = function(){
	return new Table(this.lines
		.filter(function(y){
			return y
				.join("")
				.trim()
				.length;
			}
		)
	)
};
Table.prototype.getInverse = function(a,b){
	var t = []
	for (var i=0; i<this.getNumberOfColumns(); i++){
		t.push(this.getColumn(i))
	}
	return new Table(t)
};

Table.prototype.getLinesBetween = function(a,b){
	return new Table(this.lines
		.slice(a,b)
	)
};
Table.prototype.getColumnsBetween = function(a,b){
	return new Table(this
		.getInverse()
		.getLinesBetween(a,b)
		.getInverse()
		.lines
	)
};
