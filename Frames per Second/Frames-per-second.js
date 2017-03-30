"use strict";
exports.__esModule = true;
var Fps = (function () {
    function Fps(func) {
        var _this = this;
        this.handlers = [];
        if (!func || typeof func === typeof true) {
            if (window && window.requestAnimationFrame) {
                this.func = window.requestAnimationFrame.bind(window);
                if (func === true) {
                    this.start();
                    var display_1 = window.document.createElement('div');
                    display_1.style.position = 'fixed';
                    display_1.style.top = '0px';
                    display_1.style.right = '0px';
                    window.document.body.appendChild(display_1);
                    this.addHandler(function (x) { return display_1.innerHTML = _this.framesPerSecond; });
                }
            }
        }
        else {
            this.func = func;
        }
    }
    Fps.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    Fps.prototype.update = function () {
        this.now = Date.now();
        if (this.lastTime)
            this.framesPerSecond = -~(1000 / (this.now - this.lastTime));
        this.lastTime = this.now;
        var self = this;
        this.handlers.forEach(function (f) {
            f.bind(self)();
        });
    };
    Fps.prototype.start = function () {
        var self = this;
        var wtf = function () {
            self.update.bind(self)();
            self.func(wtf);
        };
        self.func(wtf);
    };
    return Fps;
}());
exports.Fps = Fps;
