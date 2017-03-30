var pointString = function(points){
  return points.map(function(x){return (x[0] || x.x) + "," + (x[1] || x.y)})
               .join(" ");
};
