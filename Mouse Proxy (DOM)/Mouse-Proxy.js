"use strict";
exports.__esModule = true;
var db82_element_click_coordinates_1 = require("db82-element-click-coordinates");
function MouseProxy(element) {
    var self;
    self = this;
    this.position = [NaN, NaN];
    this.clickCount = 0;
    this.down = false;
    this.mouseInElementArea = false;
    element.addEventListener('mousemove', function (e) {
        var c;
        c = db82_element_click_coordinates_1.relMouseCoords(e);
        self.position[0] = c[0];
        self.position[1] = c[1];
    });
    element.addEventListener('mousedown', function (e) {
        self.clickCount += 1;
        self.down = true;
    });
    element.addEventListener('mouseup', function (e) {
        self.clickCount += 1;
        self.down = false;
    });
}
exports.MouseProxy = MouseProxy;
