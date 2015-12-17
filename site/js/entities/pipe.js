'use strict';

var PipeGraphicsComponent = require('../components/graphics/pipe'),
    PhysicsComponent = require('../components/physics/physics');

var Pipe = function (startPosition) {
  this.components = {
    graphics: new PipeGraphicsComponent(this),
    physics: new PhysicsComponent(this)
  };

  this.height = Math.random();
  this.width = 0.15;
  this.gap = 0.15;

  this.components.physics.position.x = startPosition + (this.width / 2);
  this.components.physics.velocity.x = -0.3;
};

module.exports = Pipe;
