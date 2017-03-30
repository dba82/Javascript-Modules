export var eventTypes = {
  MOUSE: ['mousedown', 'mousemove', 'mouseup',  'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'DOMMouseScroll',  'mousewheel', 'wheel'],
  TOUCH: ['touchstart', 'touchmove', 'touchend'], 
  POINTER: []
}
eventTypes.POINTER = ['pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture']
  .concat(eventTypes.MOUSE)
  .concat(eventTypes.TOUCH)
