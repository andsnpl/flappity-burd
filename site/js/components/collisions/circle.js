'use strict';

var clamp = require('../../helpers').clamp;

var CircleCollisionComponent = function (entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.size = {x: radius, y: radius};
  this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function (entity) {
  if (entity.components.collisions.type === 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collisions.type === 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

CircleCollisionComponent.prototype.collideCircle = function (entity) {
  var positionA = this.entity.components.physics.position,
      positionB = entity.components.physics.position;

  var radiusA = this.radius,
      radiusB = entity.components.collisions.radius;

  var diff = {x: positionA.x - positionB.x,
              y: positionA.y - positionB.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  var radiusSum = radiusA + radiusB;

  return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function (entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collisions.size;

  var closest = {
    x: clamp(positionA.x, positionB.x - sizeB.x / 2,
             positionB.x + sizeB.x / 2),
    y: clamp(positionA.y, positionB.y - sizeB.y / 2,
             positionB.y + sizeB.y / 2)
  };


  var radiusA = this.radius;

  var diff = {x: positionA.x - closest.x,
              y: positionA.y - closest.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  return distanceSquared < radiusA * radiusA;
};

module.exports = CircleCollisionComponent;
