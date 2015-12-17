'use strict';

var BurdGraphicsComponent = require('../components/graphics/burd'),
    PhysicsComponent = require('../components/physics/physics');

var Burd = function () {
  this.components = {
    graphics: new BurdGraphicsComponent(this),
    physics: new PhysicsComponent(this)
  };

  this.components.physics.position.y = 0.5;
  this.components.physics.acceleration.y = -2;
};

module.exports = Burd;
