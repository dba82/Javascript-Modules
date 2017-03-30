var _ = require('lodash');

function StateContainer(store){
  this.store = store || [];
  this.updaters = [];
  this.collectors = [];
	this.drawers = [];
}
StateContainer.prototype.addCollector = function(obj){
  this.collectors.push(obj);
  return this;
}
StateContainer.prototype.addUpdater = function(obj){
  this.updaters.push(obj);
  return this;
}
StateContainer.prototype.addObject = function(obj){
  this.store.push(obj);
  return this;
}
StateContainer.prototype.draw = function(drawfunc){
  var self;

  self = this;
  this.store.forEach(function(x){
    self.drawers.forEach(function(d){
        d(x);
    })
  });
}
StateContainer.prototype.addDrawer = function(obj){
  this.drawers.push(obj);
  return this;
}
StateContainer.prototype.update = function(){
  var self;

  self = this;
  this.updaters.forEach(function(u){
    self.store = self.store.map(u)
  })
  this.collectors.forEach(function(c){
    self.store = self.store.filter(c)
  })
}
