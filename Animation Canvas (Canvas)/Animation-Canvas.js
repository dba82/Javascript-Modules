"use strict";
exports.__esModule = true;
var AnimationCanvas = (function () {
    function AnimationCanvas(canvas) {
        this.canvas = canvas;
        this.currentTime = 0;
        this.handlers = [];
        this.requestID = undefined;
    }
    AnimationCanvas.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    AnimationCanvas.prototype.removeHandler = function (handler) {
        this.handlers.splice(this.handlers.indexOf(handler), 1);
    };
    AnimationCanvas.prototype.draw = function () {
        var self = this;
        this.handlers.forEach(function (f) { f(self.currentTime); });
        this.currentTime += 1;
        this.requestID = requestAnimationFrame(self.draw.bind(self));
    };
    AnimationCanvas.prototype.pause = function () {
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            this.requestID = undefined;
        }
    };
    AnimationCanvas.prototype.resume = function () {
        this.draw();
    };
    AnimationCanvas.prototype.toggle = function () {
        if (this.requestID) {
            this.pause();
        }
        else {
            this.resume();
        }
    };
    return AnimationCanvas;
}());
exports.AnimationCanvas = AnimationCanvas;
