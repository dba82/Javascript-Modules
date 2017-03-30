"use strict";
exports.__esModule = true;
exports.keycodes = {
    8: { name: "backspace" },
    9: { name: "tab",
        symbol: " " },
    13: { name: "enter" },
    16: { name: "shift" },
    17: { name: "ctrl" },
    18: { name: "alt" },
    19: { name: "pause/break" },
    20: { name: "caps lock" },
    27: { name: "escape" },
    32: { name: "(space)",
        symbol: " " },
    33: { name: "page up" },
    34: { name: "page down" },
    35: { name: "end" },
    36: { name: "home" },
    37: { name: "left arrow",
        symbol: "<-" },
    38: { name: "up arrow",
        symbol: "-^" },
    39: { name: "right arrow",
        symbol: "->" },
    40: { name: "down arrow",
        symbol: "-v" },
    45: { name: "insert" },
    46: { name: "delete" },
    48: { name: "0" },
    49: { name: "1" },
    50: { name: "2" },
    51: { name: "3" },
    52: { name: "4" },
    53: { name: "5" },
    54: { name: "6" },
    55: { name: "7" },
    56: { name: "8" },
    57: { name: "9" },
    65: { name: "a" },
    66: { name: "b" },
    67: { name: "c" },
    68: { name: "d" },
    69: { name: "e" },
    70: { name: "f" },
    71: { name: "g" },
    72: { name: "h" },
    73: { name: "i" },
    74: { name: "j" },
    75: { name: "k" },
    76: { name: "l" },
    77: { name: "m" },
    78: { name: "n" },
    79: { name: "o" },
    80: { name: "p" },
    81: { name: "q" },
    82: { name: "r" },
    83: { name: "s" },
    84: { name: "t" },
    85: { name: "u" },
    86: { name: "v" },
    87: { name: "w" },
    88: { name: "x" },
    89: { name: "y" },
    90: { name: "z" },
    91: { name: "left window key" },
    92: { name: "right window key" },
    93: { name: "select key" },
    96: { name: "numpad 0" },
    97: { name: "numpad 1" },
    98: { name: "numpad 2" },
    99: { name: "numpad 3" },
    100: { name: "numpad 4" },
    101: { name: "numpad 5" },
    102: { name: "numpad 6" },
    103: { name: "numpad 7" },
    104: { name: "numpad 8" },
    105: { name: "numpad 9" },
    106: { name: "multiply" },
    107: { name: "add" },
    109: { name: "subtract" },
    110: { name: "decimal point" },
    111: { name: "divide" },
    112: { name: "f1" },
    113: { name: "f2" },
    114: { name: "f3" },
    115: { name: "f4" },
    116: { name: "f5" },
    117: { name: "f6" },
    118: { name: "f7" },
    119: { name: "f8" },
    120: { name: "f9" },
    121: { name: "f10" },
    122: { name: "f11" },
    123: { name: "f12" },
    144: { name: "num lock" },
    145: { name: "scroll lock" },
    186: { name: "semi-colon" },
    187: { name: "equal sign" },
    188: { name: "comma" },
    189: { name: "dash" },
    190: { name: "period" },
    191: { name: "forward slash" },
    192: { name: "grave accent" },
    219: { name: "open bracket" },
    220: { name: "back slash" },
    221: { name: "close braket" },
    222: { name: "single quote" }
};
exports.keynames = (function () {
    var result = {};
    Object.keys(exports.keycodes)
        .forEach(function (k) {
        result[exports.keycodes[k].name] = k;
    });
    return result;
}());