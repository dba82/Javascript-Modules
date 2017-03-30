"use strict";
exports.__esModule = true;
var db82_shape_intersection_detectors_1 = require("db82-shape-intersection-detectors");
function switchArguments(fn, scope) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(scope || this, args.reverse());
    };
}
;
var CollisionTable = (function () {
    function CollisionTable() {
        this.handlerTable = {};
        this.checkerTable = {};
    }
    CollisionTable.prototype.addCollisionTypeHandler = function (type1, type2, handler) {
        if (!this.handlerTable[type1]) {
            this.handlerTable[type1] = {};
        }
        if (!this.handlerTable[type2]) {
            this.handlerTable[type2] = {};
        }
        if (!this.handlerTable[type1][type2]) {
            this.handlerTable[type1][type2] = [];
        }
        if (!this.handlerTable[type2][type1]) {
            this.handlerTable[type2][type1] = [];
        }
        this.handlerTable[type1][type2].push(handler);
        if (type1 != type2) {
            this.handlerTable[type2][type1].push(switchArguments(handler));
        }
    };
    CollisionTable.prototype.setCollisionTypeChecker = function (type1, type2, checker) {
        if (!this.checkerTable[type1]) {
            this.checkerTable[type1] = {};
        }
        if (!this.checkerTable[type2]) {
            this.checkerTable[type2] = {};
        }
        this.checkerTable[type1][type2] = checker;
        var t = switchArguments(checker);
        this.checkerTable[type2][type1] = t;
    };
    CollisionTable.prototype.setCollisionTypeCheckersAndHandlers = function (arr) {
        var self = this;
        arr.forEach(function (x) {
            self.setCollisionTypeChecker(x[0], x[1], x[2]);
            if (x[3]) {
                x[3].forEach(function (y) { return self.addCollisionTypeHandler(x[0], x[1], y); });
            }
        });
    };
    CollisionTable.prototype.checkAndHandleCollision = function (obj1, obj2) {
        if (!this.checkerTable[obj1.type] || !this.checkerTable[obj1.type][obj2.type])
            return;
        if (!!this.checkerTable[obj1.type][obj2.type](obj1, obj2)) {
            this.handlerTable[obj1.type][obj2.type].forEach(function (f) { return f(obj1, obj2); });
        }
    };
    CollisionTable.prototype.checkCollisions = function (objects, checked) {
        var _this = this;
        objects.forEach(function (obj1) {
            objects.filter(function (obj2) {
                if (obj1 == obj2 || checked['' + obj1.id + ' ' + obj2.id])
                    return false;
                return db82_shape_intersection_detectors_1.boundingboxIntersectsBoundingbox(obj1.getBoundingbox(), obj2.getBoundingbox());
            }).forEach(function (objx) {
                _this.checkAndHandleCollision(obj1, objx);
                checked['' + objx.id + ' ' + obj1.id] = true;
                checked['' + obj1.id + ' ' + objx.id] = true;
            });
        });
    };
    return CollisionTable;
}());
exports.CollisionTable = CollisionTable;
