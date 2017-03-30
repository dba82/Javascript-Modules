"use strict";
exports.__esModule = true;
exports.eventTypes = {
    MOUSE: ['mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'DOMMouseScroll', 'mousewheel', 'wheel'],
    TOUCH: ['touchstart', 'touchmove', 'touchend'],
    POINTER: []
};
exports.eventTypes.POINTER = ['pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture']
    .concat(exports.eventTypes.MOUSE)
    .concat(exports.eventTypes.TOUCH);
