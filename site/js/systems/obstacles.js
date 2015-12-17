'use strict';

var Pipe = require('../entities/pipe');

var ObstacleSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
};

ObstacleSystem.prototype.run = function () {
  window.setInterval(this.tick.bind(this), 1000 * 2);
};

ObstacleSystem.prototype.tick = function () {
  var aspectRatio = this.canvas.width / 2 / this.canvas.height;
  this.entities.push(new Pipe(aspectRatio));
  this.entities.forEach((ent, i) => {
    if (ent.components.physics.position.x < -aspectRatio) {
      this.entities.splice(i, 1);
    }
  });
};

module.exports = ObstacleSystem;
