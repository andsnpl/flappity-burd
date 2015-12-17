'use strict';

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
  var positionA = this.entity.components.physics.position,
      positionB = entity.components.physics.position;

  var sizeA = this.size,
      sizeB = entity.components.collisions.size;

  var leftA = positionA.x - sizeA.x / 2;
  var rightA = positionA.x + sizeA.x / 2;
  var bottomA = positionA.y - sizeA.y / 2;
  var topA = positionA.y + sizeA.y / 2;

  var leftB = positionB.x - sizeB.x / 2;
  var rightB = positionB.x + sizeB.x / 2;
  var bottomB = positionB.y - sizeB.y / 2;
  var topB = positionB.y + sizeB.y / 2;

  return !(leftA > rightB || leftB > rightA ||
           bottomA > topB || bottomB > topA);
};

module.exports = CircleCollisionComponent;
