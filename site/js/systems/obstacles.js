'use strict';

var Pipe = require('../entities/pipe'),
    AltitudeLimit = require('../entities/altitude-limit'),
    scale = require('../helpers').scale;

var ObstacleSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.ground = new AltitudeLimit(this.canvas.width, 0);
  this.ceiling = new AltitudeLimit(this.canvas.width, 1);
  this.entities.push(this.ground, this.ceiling);
  this.intvl = null;
};

ObstacleSystem.prototype.run = function () {
  // clear existing pipes
  for (var i = this.entities.length - 1; i >= 0; i--) {
    if (this.entities[i] instanceof Pipe) { this.entities.splice(i, 1); }
  }
  this.intvl = window.setInterval(this.tick.bind(this), 1000 * 2);
};

ObstacleSystem.prototype.pause = function () {
  this.intvl && window.clearInterval(this.intvl);
  this.intvl = null;
};

ObstacleSystem.prototype.tick = function () {
  var aspectRatio = this.canvas.width / 2 / this.canvas.height,
      height = scale(Math.random(), [0, 1], [0.2, 0.8]),
      gap = 0.2,
      height1 = height - gap / 2,
      height2 = 1 - height1 - gap,

      pass = this.onPassObstacle.bind(this);

  this.ground.width = this.canvas.width; // Update the ground if the canvas size changes.

  this.entities.push(new Pipe(aspectRatio, height1, 'T', pass));
  this.entities.push(new Pipe(aspectRatio, height2, 'B'));
  this.entities.forEach((ent, i) => {
    if (ent.components.physics.position.x < -aspectRatio - (ent.width / 2)) {
      this.entities.splice(i, 1);
    }
  });
};

module.exports = ObstacleSystem;
