'use strict';

var PhysicsComponent = function (entity) {
  this.entity = entity;
  this.time = 0;
  // 2*3*5*7*11*13*17*19*23*29
  this.period = 6469693230;
  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function (delta) {
  this.time = (this.time + delta) % this.period;

  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

module.exports = PhysicsComponent;
