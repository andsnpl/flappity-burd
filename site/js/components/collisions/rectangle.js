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

module.exports = RectCollisionComponent;
