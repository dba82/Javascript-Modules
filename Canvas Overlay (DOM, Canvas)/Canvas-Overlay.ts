import { eventTypes } from 'db82-dom-event-types';
import * as dom from 'db82-dom-utils';

export function makeOverlay(document, canvas){
  var overlaycanvas, canvaswrapper, prop;

  overlaycanvas = document.createElement('canvas');
  canvas.style.position = "absolute";
  overlaycanvas.width = canvas.width;
  overlaycanvas.height = canvas.height;
  for (prop in canvas.style){//seufz muss so gemacht werden ...
    overlaycanvas.style[prop] = canvas.style[prop]
  }
  canvas.style.background = 'none';
  dom.wrap(document, canvas)
     .appendChild(overlaycanvas);
  dom.routeEvents(overlaycanvas, canvas, eventTypes.POINTER)
  return overlaycanvas;
}
