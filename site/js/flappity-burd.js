'use strict';

var GraphicsSystem = require('./systems/graphics'),
    Burd = require('./entities/burd');

var FlappityBurd = function(canvas) {
  this.entities = [new Burd()];
  this.graphics = new GraphicsSystem(this.entities, canvas);
};

FlappityBurd.prototype.run = function () {
  this.graphics.run();
};

module.exports = FlappityBurd;
