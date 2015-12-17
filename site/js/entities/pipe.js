'use strict';

var PipeGraphicsComponent = require('../components/graphics/pipe'),
    PhysicsComponent = require('../components/physics/physics'),
    RectCollisionComponent = require('../components/collisions/rectangle');

var Pipe = function (startX, startY, height) {
  this.height = height;
  this.width = 0.15;

  this.components = {
    graphics: new PipeGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    collisions: new RectCollisionComponent(this, {x: this.width, y: this.height})
  };

  this.components.physics.position.x = startX + (this.width / 2);
  this.components.physics.position.y = startY;
  this.components.physics.velocity.x = -0.1;
  this.components.collisions.onCollision = this.onCollision.bind(this);
};

Pipe.prototype.onCollision = function (entity) {
  console.log('Pipe collided with entity:', entity);
};

module.exports = Pipe;
