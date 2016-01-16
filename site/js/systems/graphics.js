'use strict';

var AltitudeLimit = require('../entities/altitude-limit');

/**
 * Object to iterate through entities and draw them to the screen
 *
 * @class
 * @param {Array}             entities all the entities in the system
 * @param {HTMLCanvasElement} canvas   the canvas to draw on
 */
var GraphicsSystem = function GraphicsSystem(entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function () {
  var tick = GraphicsSystem.prototype.tick.bind(this);
  (function recur() {
    global.requestAnimationFrame((t) => {
      tick(t, recur);
    });
  }());
};

GraphicsSystem.prototype.pause = function () {
  this.tick = function () {};
};

GraphicsSystem.prototype.tick = function (t, cb) {
  // Blank slate.
  if (this.canvas.width !== this.canvas.offsetWith
      || this.canvas.height !== this.canvas.offsetHeight) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.entities.forEach((ent) => {
      if (ent instanceof AltitudeLimit) {
        ent.width = (this.canvas.width / this.canvas.height) + 0.5;
      }
    });
  }
  this.context.fillStyle = this.context.createLinearGradient(
    0, 0, 0, this.canvas.height);
  this.context.fillStyle.addColorStop(0.25, '#fdfcfc');
  this.context.fillStyle.addColorStop(1, '#b1b1b1');
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // Set up the canvas dimensions that the rest of the game will see.
  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  // Render.
  this.entities.forEach((entity) => {
    if (!entity.components || !entity.components.graphics) { return; }
    entity.components.graphics.draw(this.context);
  });

  this.context.restore();

  cb && cb();
};

module.exports = GraphicsSystem;
