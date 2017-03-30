"use strict";
exports.__esModule = true;
var db82_dom_event_types_1 = require("db82-dom-event-types");
var dom = require("db82-dom-utils");
function makeOverlay(document, canvas) {
    var overlaycanvas, canvaswrapper, prop;
    overlaycanvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    overlaycanvas.width = canvas.width;
    overlaycanvas.height = canvas.height;
    for (prop in canvas.style) {
        overlaycanvas.style[prop] = canvas.style[prop];
    }
    canvas.style.background = 'none';
    dom.wrap(document, canvas)
        .appendChild(overlaycanvas);
    dom.routeEvents(overlaycanvas, canvas, db82_dom_event_types_1.eventTypes.POINTER);
    return overlaycanvas;
}
exports.makeOverlay = makeOverlay;
