'use strict';

var BurdGraphicsComponent = require('../components/graphics/burd'),
    PhysicsComponent = require('../components/physics/physics'),
    CircleCollisionComponent = require('../components/collisions/circle');

var Burd = function () {
  this.radius = 0.03;

  this.components = {
    graphics: new BurdGraphicsComponent(this),
    collisions: new CircleCollisionComponent(this, this.radius)
  };

  this.reset();
};

Burd.prototype.reset = function () {
  this.components.physics = new PhysicsComponent();
  this.components.physics.position.y = 0.5;
  this.components.physics.acceleration.y = -1.5;
};

module.exports = Burd;
