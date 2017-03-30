"use strict";
exports.__esModule = true;
var db82_element_click_coordinates_1 = require("db82-element-click-coordinates");
function Drawable(canvasElement, memory) {
    canvasElement.addEventListener('mousedown', onstart);
    canvasElement.addEventListener('touchstart', onstart);
    canvasElement.addEventListener('mouseup', onend);
    canvasElement.addEventListener('touchend', onend);
    canvasElement.addEventListener('mousemove', onmove);
    canvasElement.addEventListener('touchmove', onmove);
    var self = this;
    this.handlers = [];
    this.points = [];
    this.mousedown;
    function onstart(event) {
        event.preventDefault();
        self.mousedown = true;
    }
    function onend(event) {
        self.mousedown = false;
        self.points = (memory)
            ? self.points
            : [];
    }
    function onmove(event) {
        var lastPoint, previousPoint;
        event.preventDefault();
        if (self.mousedown) {
            self.points.push(db82_element_click_coordinates_1.relMouseCoords(event));
            lastPoint = self.points[self.points.length - 1];
            previousPoint = (self.points.length > 1)
                ? self.points[self.points.length - 2]
                : lastPoint;
            self.handlers.forEach(function (func) {
                func(lastPoint, previousPoint, self.points);
            });
        }
    }
}
exports.Drawable = Drawable;
;
Drawable.prototype.addDrawHandler = function (handler) {
    this.handlers.push(handler);
};
Drawable.prototype.removeDrawHandler = function (handler) {
    this.handlers.splice(this.handlers.indexOf(handler), 1);
};
Drawable.prototype.addDrawHandler = function (handler) {
    this.handlers.push(handler);
};
Drawable.prototype.removeDrawHandler = function (handler) {
    this.handlers.splice(this.handlers.indexOf(handler), 1);
};
