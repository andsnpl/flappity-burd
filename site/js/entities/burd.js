'use strict';

var BurdGraphicsComponent = require('../components/graphics/burd'),
    PhysicsComponent = require('../components/physics/physics'),
    CircleCollisionComponent = require('../components/collisions/circle');

var Burd = function () {
  this.radius = 0.02;

  this.components = {
    graphics: new BurdGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    collisions: new CircleCollisionComponent(this, this.radius)
  };

  this.components.physics.position.y = 0.5;
  this.components.physics.acceleration.y = -2;
  this.components.collisions.onCollision = this.onCollision.bind(this);
};

Burd.prototype.onCollision = function (entity) {
  console.log('Burd collided with entity:', entity);
};

module.exports = Burd;
