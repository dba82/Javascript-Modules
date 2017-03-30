"use strict";
exports.__esModule = true;
function relMouseCoords(event, elementNode) {
    //http://www.kirupa.com/html5/get_element_position_using_javascript.htm
    elementNode = elementNode || event.target;
    var totalOffset, currentElement;
    totalOffset = [0, 0];
    currentElement = elementNode;
    do {
        totalOffset[0] += currentElement.offsetLeft - currentElement.scrollLeft + currentElement.clientLeft;
        totalOffset[1] += currentElement.offsetTop - currentElement.scrollTop + currentElement.clientTop;
    } while (currentElement = currentElement.offsetParent);
    return [
        (event.pageX - totalOffset[0]) * elementNode.width / +elementNode.clientWidth,
        (event.pageY - totalOffset[1]) * elementNode.height / +elementNode.clientHeight
    ];
}
exports.relMouseCoords = relMouseCoords;
