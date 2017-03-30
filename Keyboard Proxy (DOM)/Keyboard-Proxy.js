"use strict";
exports.__esModule = true;
var db82_keycodes_1 = require("db82-keycodes");
var KeyboardProxy = (function () {
    function KeyboardProxy() {
        this.pressedKeys = [];
        this.releasedKeys = [];
        this.down = {};
        this.held = {};
        this.up = {};
        this.done = {};
        var self = this;
        window.addEventListener('keydown', function (e) {
            if (self.pressedKeys.indexOf(e.key || db82_keycodes_1.keycodes[e.keyCode].name) == -1) {
                self.pressedKeys.push(e.key || db82_keycodes_1.keycodes[e.keyCode].name);
            }
        });
        window.addEventListener('keyup', function (e) {
            self.pressedKeys.splice(self.pressedKeys.indexOf(e.key || db82_keycodes_1.keycodes[e.keyCode].name), 1);
            if (self.releasedKeys.indexOf(e.key || db82_keycodes_1.keycodes[e.keyCode].name) == -1) {
                self.releasedKeys.push(e.key || db82_keycodes_1.keycodes[e.keyCode].name);
            }
        });
    }
    KeyboardProxy.prototype.handleInput = function () {
        var _this = this;
        this.pressedKeys
            .filter(function (x) { return _this.down[x]; })
            .forEach(function (x) { return _this.down[x].forEach(function (f) { f(); }); });
        this.releasedKeys
            .filter(function (x) { return _this.up[x]; })
            .forEach(function (x) {
            _this.up[x].forEach(function (f) { f(); });
            _this.done[x] = false;
        });
        this.pressedKeys
            .filter(function (x) { return _this.held[x] && !_this.done[x]; })
            .forEach(function (x) {
            _this.held[x].forEach(function (f) { f(); });
            _this.done[x] = true;
        });
        this.releasedKeys = [];
    };
    KeyboardProxy.prototype.addKeyhandler = function (key, cb, modifier) {
        if (modifier === void 0) { modifier = "down"; }
        this[modifier][key] = this[modifier][key] || [];
        this[modifier][key].push(cb);
    };
    KeyboardProxy.prototype.removeKeyHandler = function (key, cb, modifier) {
        if (modifier === void 0) { modifier = "down"; }
        var index = this[modifier][key].indexOf(cb);
        if (index != -1) {
            this[modifier][key].splice(index, 1);
        }
    };
    KeyboardProxy.prototype.setControlScheme = function (scheme) {
        for (var k in scheme) {
            if (scheme[k].down) {
                this.addKeyhandler(k, scheme[k].down, "down");
            }
            if (scheme[k].up) {
                this.addKeyhandler(k, scheme[k].up, "up");
            }
            if (scheme[k].held) {
                this.addKeyhandler(k, scheme[k].held, "held");
            }
        }
    };
    return KeyboardProxy;
}());
exports.KeyboardProxy = KeyboardProxy;
