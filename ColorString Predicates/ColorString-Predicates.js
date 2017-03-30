var cssColorNames = require("../CSS Colornames/CSS-Colornames")

function isRGBString(str){
  return /^rgb\((1\d\d|2[0-5][0-5]|\d\d), *(1\d\d|2[0-5][0-5]|\d\d), *(1\d\d|2[0-5][0-5]|\d\d)\)$/.test(str.toLowerCase())
};

function isRGBPercentString(str){
  return /^rgb\((100|\d\d?)%, *(100|\d\d?)%, *(100|\d\d?)%\)$/.test(str.toLowerCase())
};

function isRGBAString(str){
  return /^rgba\((1\d\d|2[0-5][0-5]|\d\d), *(1\d\d|2[0-5][0-5]|\d\d), *(1\d\d|2[0-5][0-5]|\d\d), *(1\.0|0\.\d+)\)$/.test(str.toLowerCase())
};

function isRGBAPercentString(str){
  return /^rgba\((100|\d\d?)%, *(100|\d\d?)%, *(100|\d\d?)%, *(1\.0|0\.\d+)\)$/.test(str.toLowerCase())
};

function isHSLString(str){
  return /^hsl\(\d{1,10}, *(100|\d\d?)%, *(100|\d\d?)%\)$/.test(str.toLowerCase())
  //der erste Wert ist immer modulo 360
};

function isHSLAString(str){
  return /^hsla\(\d{1,10}, *(100|\d\d?)%, *(100|\d\d?)%, *(1\.0|0\.\d+)\)$/.test(str.toLowerCase())
};

function isHexString(str){
  return /^#[\dabcdef]{6}$/.test(str.toLowerCase())
};

function isShortHexString(str){
  return /^#[\dabcdef]{3}$/.test(str.toLowerCase())
};

function isCSSColorNameString(str){
  return Object.keys(cssColorNames).indexOf(str) !== -1;
};

function isColorString(str){
    var testFunctions;

    testFunctions = [isRGBAString,
                     isRGBAPercentString,
                     isRGBString,
                     isRGBPercentString,
                     isHSLAString,
                     isHSLString,
                     isHexString,
                     isShortHexString,
                     isCSSColorNameString];
    return testFunctions.map(function(f){f(str)})
                        .some(function(x){return x});
};
