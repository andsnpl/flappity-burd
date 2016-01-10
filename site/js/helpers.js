'use strict';

// some simple functions to avoid spelling stuff out in the classes

var h = exports;

h.clamp = function(value, low, high) {
  if (value < low) {
    return low;
  }
  if (value > high) {
    return high;
  }
  return value;
};

h.subtract = function (a, b) { return a - b; };

h.scale = function (value, srcRange, dstRange) {
  var [srcMin, srcMax] = srcRange.sort(h.subtract),
      [dstMin, dstMax] = dstRange.sort(h.subtract),
      srcSize = srcMax - srcMin,
      dstSize = dstMax - dstMin;

  return ((value - srcMin) / srcSize * dstSize) + dstMin;
};
