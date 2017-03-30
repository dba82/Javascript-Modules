function drawAlongPoints(generatePointFunc, drawFunc, Points){
  Points = Points || [];
  return function _generatePoints(){
    var self, point, i;

    self = this;
    point = generatePointFunc.bind(self)();
    Points.push(point);
    i = ( Points.length > 2)
        ? 2
        : 1;
    drawFunc(point, Points[Points.length-i], Points);
  };
};
