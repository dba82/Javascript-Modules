/*
  -contrastColor
  -rotate(colorspace, degrees)
  -translate(colorspace, distance, toroidTopology?)
  -
*/

function lightenHSL(colorArray, amount){
  return [colorArray[0],
          colorArray[1],
          Math.min(colorArray[2] + amount, 100)];
};

function darkenHSL(colorArray, amount){
  return [colorArray[0],
          colorArray[1],
          Math.max(colorArray[2] - amount, 0)];
};

function saturateHSL(colorArray, amount){
  return [colorArray[0],
          Math.min(colorArray[1] + amount, 100),
          colorArray[2]];
};

function desaturateHSL(colorArray, amount){
  return [colorArray[0],
          Math.max(colorArray[1] - amount, 100),
          colorArray[2]];
};

function changeHueHSL(colorArray, amount){
  return [(colorArray[0] + amount) % 360,
          colorArray[1],
          colorArray[2]];
};
