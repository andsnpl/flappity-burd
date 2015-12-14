'use strict';

var GraphicsSystem = require('./systems/graphics'),
    Burd = require('./entities/burd');

var FlappityBurd = function() {
  this.entities = [new Burd()];
  this.graphics = new GraphicsSystem(this.entities);
};

FlappityBurd.prototype.run = function () {
  this.graphics.run();
};

module.exports = FlappityBurd;
