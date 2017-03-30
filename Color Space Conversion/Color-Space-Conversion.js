var xMath = require("../Math/Math")

function hue2rgb(p, q, t){
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

function hslToRgb(h, s, l){
//http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b, q, p;

    if (s === 0){
        r = g = b = l; // achromatic
    } else {
        q = ( l < 0.5)
            ? l * (1 + s)
            : l + s - l * s;
        p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
};

function rgbToHsl(r, g, b){
  var h, s, l, cmax, cmin, delta;

  r /= 255;
  g /= 255;
  b /= 255;
  cmax = Math.max(r, g, b);
  cmin = Math.min(r, g, b);
  delta = cmax - cmin;
  h = 60 * (
        (delta === 0) ? 0
      : (cmax === r) ? xMath.modulo((g - b) / delta, 6)
      : (cmax === g) ? (b - r) / delta + 2
      : (cmax === b) ? (r - g) / delta + 4
      : NaN
      );
  l = (cmax + cmin) / 2;
  s = ( cmax === cmin) //achromatic
      ? 0
      : delta / (1 - Math.abs(2 * l - 1))
  return [h, s, l];
};
