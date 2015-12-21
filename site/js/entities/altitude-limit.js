'use strict';

var AltLimitGraphicsComponent = require('../components/graphics/altitude-limit'),
    PhysicsComponent = require('../components/physics/physics'),
    RectCollisionComponent = require('../components/collisions/rectangle');

var Ground = function (yPosition) {
  this.height = 0.02;
  this.width = 10;

  this.components = {
    graphics: new AltLimitGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    collisions: new RectCollisionComponent(this, {x: this.width, y: this.height})
  };

  this.components.physics.period = 0.2 / 0.35;
  this.components.physics.position.x = 0;
  this.components.physics.position.y = (this.height / 2) + yPosition;
};

module.exports = Ground;
