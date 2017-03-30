function allSegmentsRecurse(polygon){
  /*
    it's assumed that the first and the last point are the same
    a polygon is simply an array of points
  */
  if (polygon.length === 1){
    return [];
  } else {
    return [[polygon[0], polygon[1]]]
            .concat(allSegmentsRecurse(polygon.slice(1)))
  }
}

export function allSegments(polygon){
  return allSegmentsRecurse(polygon.concat([polygon[0]]));
}

function triangulatePolygon(polygon){
  /** ...... */
}

export function getBoundingboxForPoints(points){//x,y,w,h
  //diese Funktion ist sehr langsam
  var xs = points.map(x => x[0]).sort((a,b) => a-b);
  var ys = points.map(x => x[1]).sort((a,b) => a-b);
  return [xs[0], ys[0],xs[xs.length]-xs[0], ys[ys.length]-ys[0]];
}

export function getBoundingboxForSegment(segment){//x,y,w,h
  let end_punkt = segment[1];
  let start_punkt = segment[0];
  let width = Math.abs(end_punkt[0]-start_punkt[0])
  let height = Math.abs(end_punkt[1]-start_punkt[1])
  let anchor = [Math.min(start_punkt[0], end_punkt[0]), Math.min(start_punkt[1], end_punkt[1])]
  return [...anchor, width, height];
}

export function getBoundingboxForCircle(center, radius){//x,y,w,h
  return [center[0]-radius, center[1]-radius, radius*2, radius*2];
}