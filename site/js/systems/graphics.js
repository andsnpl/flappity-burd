'use strict';

var GraphicsSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function () {
  global.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function () {
  // Blank slate.
  this.canvas.width = this.canvas.offsetWidth;
  this.canvas.height = this.canvas.offsetHeight;
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Render.
  this.entities.forEach((entity) => {
    if (!entity.components || !entity.components.graphics) { return; }
    entity.components.graphics.draw(this.context);
  });
};

module.exports = GraphicsSystem;
