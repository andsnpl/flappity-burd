'use strict';

/**
 * Object to maintain the position of an entity.
 *
 * @class
 * @param {*} entity the entity owning this component
 */
var PhysicsComponent = function PhysicsComponent (entity) {
  this.entity = entity;
  this.time = 0;
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
  this.time = this.time + delta;

  // if period was set, we modulo the time by the period, so that the time will
  // repeat over the course of many updates.
  this.period > 0 && (this.time %= this.period);

  // Update velocity based on acceleration and time
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  // Update position based on velocity and time
  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

module.exports = PhysicsComponent;
