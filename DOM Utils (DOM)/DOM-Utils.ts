export function wrap(document, elm){
  var wrapper, elmparent;

  wrapper = document.createElement('div');
  elmparent = elm.parentNode;
  elmparent.insertBefore(wrapper, elm);
  wrapper.appendChild(elm);
  return wrapper;
}

export function routeEvents(from, to, eventTypes){
  eventTypes.forEach(function(eventType){
      from.addEventListener(eventType, function(event){
        setTimeout(function(){to.dispatchEvent(event)}, 0)}, true);
  })
};
