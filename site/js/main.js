'use strict';

// Bootstrap code

var FlappyTrump = require('./flappy-trump');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('main-canvas'),
      app = new FlappyTrump(canvas);
  app.run();
});
