'use strict';

var PhysicsSystem = function (entities) {
  this.entities = entities;
};

PhysicsSystem.prototype.run = function () {
  window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function () {
  this.entities.forEach((entity) => {
    if (!entity.components || !entity.components.physics) { return; }
    entity.components.physics.update(1/60);
  });
};

module.exports = PhysicsSystem;
