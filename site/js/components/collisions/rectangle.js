'use strict';

var RectCollisionComponent = function (entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function (entity) {
  if (entity.components.collisions.type === 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collisions.type === 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

RectCollisionComponent.prototype.collideCircle = function (entity) {
  return entity.components.collisions.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function (entity) {
  var clamp = function(value, low, high) {
    if (value < low) {
      return low;
    }
    if (value > high) {
      return high;
    }
    return value;
  };

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

module.exports = RectCollisionComponent;
