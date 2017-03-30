var Style = function(styles){
	this.styles = styles;
}

Style.prototype.toString = function(){
	var that = this.styles;
	return (that)
					? "["
						+ Object.keys(that)
										.map(function(x){
													return x + "=\"" + that[x] + "\"";
										})
										.join(", ")
						+ "]"
					: "";
}

var MultiEdge = function(nodes, node, direction, style){
	this.direction = direction;
	this.style = style;
	this.nodes = nodes;
	this.node = node;
}
MultiEdge.prototype.toString = function(){
	var those, that, dir, style;
	those = this.nodes;
	that = this.node;
	dir = this.direction;
	style = this.style;
	return "" + those.map(function(x){
													return "" + new Edge((( dir == '<')
		 												? [that, x]
														: [x, that]), style, !dir)
												}).join("")
}
var Edge = function(nodes, style, nondirected){
	this.directed = !nondirected;
	this.nodes = nodes;
	this.style = style;
}

Edge.prototype.toString = function(){
	return this.nodes.map(function(x){return x.id}).join("->") + (this.style || "")+ ";";
}
var Node = function(name, style, id){
	this.name = name;
	this.style = style;
	this.id = id;
}

Node.prototype.toString = function(){
	return this.id + " [label=\"" + this.name + "\"];" +
		this.id + " " + (this.style || "") + ";";
}

var Subgraph = function(name, nodes, edges, styles, nodeStyle){
	this.name = name;
	this.nodes = nodes;
	this.edges = edges;
	this.styles = styles;
	this.nodeStyle = nodeStyle;
}

Subgraph.prototype.toString = function(){
	return "subgraph " + this.name + "{\n" +
		(this.styles || "") + "\n" +
		(this.nodeStyle ?  "node " + this.nodeStyle + ";" : "") + "\n" +
		(this.nodes ? this.nodes.join("") : "") +
		(this.edges ? this.edges.join("") : "") +
		"}";
}

var Digraph = function(name, subgraphs){
	this.subgraphs = subgraphs;
	this.name = name;
}
Digraph.prototype.toString = function(){
	return ("digraph " + this.name + " { " + this.subgraphs.join("") + "\n}").replace(/;/g, ";\n");
}
