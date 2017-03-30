"use strict";
exports.__esModule = true;
var db82_animation_canvas_1 = require("db82-animation-canvas");
var db82_mouse_proxy_1 = require("db82-mouse-proxy");
var db82_collision_detector_1 = require("db82-collision-detector");
var db82_id_manager_1 = require("db82-id-manager");
var db82_keyboard_proxy_1 = require("db82-keyboard-proxy");
var db82_scheduler_1 = require("db82-scheduler");
var Game = (function () {
    function Game(CanvasElement) {
        var _this = this;
        this.CanvasElement = CanvasElement;
        this.go = true;
        this.eventHandlers = {};
        this.eventQueue = [];
        this.canvas = new db82_animation_canvas_1.AnimationCanvas(CanvasElement);
        this.keyboard = new db82_keyboard_proxy_1.KeyboardProxy();
        this.mouse = new db82_mouse_proxy_1.MouseProxy(CanvasElement);
        this.idManager = new db82_id_manager_1.IdManager();
        this.collisionManager = new db82_collision_detector_1.CollisionDetector(CanvasElement.width, CanvasElement.height);
        this.scheduler = new db82_scheduler_1.Scheduler();
        this.keyboard.setControlScheme({
            'p': {
                'held': function () { _this.go = !_this.go; _this.scheduler.toggle(); },
                'up': function () { }
            }
        });
        this.canvas.addHandler(function () {
            _this.scheduler.run();
            _this.keyboard.handleInput();
            if (_this.go) {
                _this.draw();
                _this.handleEvents();
                _this.collisionManager.update();
                _this.collisionManager.objects.forEach(function (x) { return x.update(); });
            }
        });
    }
    Game.prototype.setEventHandlers = function (obj) {
        var _this = this;
        Object.keys(obj).forEach(function (k) {
            _this.on(k, obj[k]);
        });
    };
    Game.prototype.emit = function (event, data) {
        this.eventQueue.push({
            name: event,
            data: data,
            time: Date.now()
        });
    };
    Game.prototype.on = function (event, fn) {
        this.eventHandlers[event] = this.eventHandlers[event] || [];
        this.eventHandlers[event].push(fn);
    };
    Game.prototype.handleEvents = function () {
        for (var i = 0; i < this.eventQueue.length; i++) {
            var event_1 = this.eventQueue[i];
            for (var j = 0; this.eventHandlers[event_1.name].length; j++) {
                this.eventHandlers[event_1.name][j](event_1);
            }
        }
        this.eventQueue = [];
    };
    Game.prototype.run = function () {
        this.canvas.draw();
    };
    Game.prototype.draw = function () {
        this.collisionManager.objects.filter(function (x) { return x.type != 'wall'; }).forEach(function (x) { return x.draw(); });
    };
    return Game;
}());
exports.Game = Game;
