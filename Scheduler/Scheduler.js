/**
 * To be used in Gameloops, like:
 *
let sched = new Scheduler;
let sched2 = new Scheduler;
sched.schedule(6000, () => console.log("huuhuuuuuuuuu"), "once");
sched.schedule(200, addBall);
sched.schedule(3000, sched.pause.bind(sched));
sched2.schedule(6000, sched.resume.bind(sched))
acan.addHandler(sched.run.bind(sched));
acan.addHandler(sched2.run.bind(sched2));
 */
"use strict";
exports.__esModule = true;
var Scheduler = (function () {
    function Scheduler() {
        this.running = true;
        this._every = [];
        this._once = [];
        this.pausedAmount = 0;
    }
    Scheduler.prototype.schedule = function (msecs, cb, modifier) {
        if (modifier === void 0) { modifier = "every"; }
        this["_" + modifier].push({
            interval: msecs,
            action: cb,
            lastTime: undefined,
            offset: 0
        });
    };
    Scheduler.prototype.every = function (ms, cb) {
        this.schedule(ms, cb, "every");
    };
    Scheduler.prototype.once = function (ms, cb) {
        this.schedule(ms, cb, "once");
    };
    Scheduler.prototype.unschedule = function (msecs, cb, modifier) {
        if (modifier === void 0) { modifier = "every"; }
        this["_" + modifier][msecs] = this["_" + modifier][msecs].filter(function (x) { return x.intervall != msecs && x.action != cb; });
    };
    Scheduler.prototype.run = function (fromStart) {
        var _this = this;
        if (!this.running)
            return;
        if (!this.startTime)
            this.startTime = Date.now();
        var now = Date.now();
        this._every
            .filter(function (x) { return now - (x.lastTime || _this.startTime) - _this.pausedAmount >= x.interval - x.offset; })
            .forEach(function (x) {
            x.action(now);
            x.offset = now - (x.lastTime || _this.startTime) + x.offset - x.interval;
            x.lastTime = now;
        });
        this._once
            .filter(function (x) { return now - _this.startTime - _this.pausedAmount >= x.interval; })
            .forEach(function (x) {
            x.action(now);
            _this._once.splice(_this._once.indexOf(x), 1);
        });
    };
    Scheduler.prototype.pause = function () {
        this.lastPauseTime = Date.now();
        this.running = false;
    };
    Scheduler.prototype.resume = function () {
        this.running = true;
        this.pausedAmount += Date.now() - this.lastPauseTime;
    };
    Scheduler.prototype.toggle = function () {
        if (this.running)
            this.pause();
        else
            this.resume();
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
