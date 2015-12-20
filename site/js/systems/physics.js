'use strict';

var CollisionSystem = require('./collisions');

var PhysicsSystem = function (entities) {
  this.entities = entities;
  this.collisions = new CollisionSystem(entities);
  this.intvl = null;
};

PhysicsSystem.prototype.run = function () {
  this.intvl = window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.pause = function () {
  this.intvl && window.clearInterval(this.intvl);
  this.intvl = null;
};

PhysicsSystem.prototype.tick = function () {
  this.entities.forEach((entity) => {
    if (!entity.components || !entity.components.physics) { return; }
    entity.components.physics.update(1/60);
  });
  this.collisions.tick();
};

module.exports = PhysicsSystem;
