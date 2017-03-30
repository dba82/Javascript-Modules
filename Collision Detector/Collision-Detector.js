"use strict";
exports.__esModule = true;
var db82_collision_detection_broad_phase_1 = require("db82-collision-detection-broad-phase");
var db82_collision_table_1 = require("db82-collision-table");
var CollisionDetector = (function () {
    function CollisionDetector(canvasW, canvasH, objects) {
        this.objects = objects;
        this.table = new db82_collision_table_1.CollisionTable();
        this.checked = {};
        this.grid = new db82_collision_detection_broad_phase_1.Grid(canvasW, canvasH, 8, 8); //die Zellengröße muss noch mindestens so groß wie das größte Objekt sein!
    }
    CollisionDetector.prototype.update = function () {
        var _this = this;
        this.grid.putObjectsOnGrid(this.objects).forEach(function (objs) { return _this.table.checkCollisions(objs, _this.checked); });
        this.checked = {};
    };
    return CollisionDetector;
}());
exports.CollisionDetector = CollisionDetector;
