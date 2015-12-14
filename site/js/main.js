'use strict';

var FlappityBurd = require('./flappity-burd');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('main-canvas'),
      app = new FlappityBurd(canvas);
  app.run();
});
