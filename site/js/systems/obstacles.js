'use strict';

var Pipe = require('../entities/pipe'),
    AltitudeLimit = require('../entities/altitude-limit'),
    scale = require('../helpers').scale;

/**
 * Object to manage adding and deleting the obstacles to the game board
 *
 * @class
 * @param {Array}             entities all the entities in the game
 * @param {HTMLCanvasElement} canvas   the canvas to draw on
 */
var ObstacleSystem = function ObstacleSystem(entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.ground = new AltitudeLimit(0);
  this.ceiling = new AltitudeLimit(1.01);
  this.entities.push(this.ground, this.ceiling);
  this.intvl = null;
};

ObstacleSystem.prototype.reset = function () {
  for (var i = this.entities.length - 1; i >= 0; i--) {
    if (this.entities[i] instanceof Pipe) { this.entities.splice(i, 1); }
  }
};

ObstacleSystem.prototype.run = function () {
  // clear existing pipes
  this.reset();
  this.intvl = window.setInterval(this.tick.bind(this), 1000 * 2);
};

ObstacleSystem.prototype.pause = function () {
  this.intvl && window.clearInterval(this.intvl);
  this.intvl = null;
};

ObstacleSystem.prototype.tick = function () {
  var aspectRatio = this.canvas.width / 2 / this.canvas.height,
      height = scale(Math.random(), [0, 1], [0.2, 0.8]),
      gap = 0.25,
      height1 = height - gap / 2,
      height2 = 1 - height1 - gap,

      pass = this.onPassObstacle.bind(this);

  this.entities.push(new Pipe(aspectRatio, height1, 'T', pass));
  this.entities.push(new Pipe(aspectRatio, height2, 'B'));
  this.entities.forEach((ent, i) => {
    if (ent.components.physics.position.x < -aspectRatio - (ent.width / 2)) {
      this.entities.splice(i, 1);
    }
  });
};

ObstacleSystem.prototype.onPassObstacle = function () {};

module.exports = ObstacleSystem;
