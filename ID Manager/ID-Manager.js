"use strict";
exports.__esModule = true;
var IdManager = (function () {
    function IdManager() {
        this.ID = 0;
    }
    IdManager.prototype.newId = function () {
        return this.ID++;
    };
    return IdManager;
}());
exports.IdManager = IdManager;
