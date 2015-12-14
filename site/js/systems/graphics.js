'use strict';

var GraphicsSystem = function (entities) {
  this.entities = entities;
  this.context = null; // TODO;
};

GraphicsSystem.prototype.run = function () {
  for (var i = 0; i < 5; i++) {
    this.tick();
  }
};

GraphicsSystem.prototype.tick = function () {
  this.entities.forEach(function (entity) {
    if (!entity.components || !entity.components.graphics) { return; }
    entity.components.graphics.draw(this.context);
  });
};

module.exports = GraphicsSystem;
