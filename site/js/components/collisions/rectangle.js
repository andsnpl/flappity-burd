'use strict';

/**
 * Object to represent a rectangular area and test if another entity is inside.
 *
 * Other code should use the `collidesWith()` method to check for collisions.
 *
 * @class
 * @param {*}      entity the entity owning this component
 * @param {object} size   the x and y dimensions of the collision area
 */
var RectCollisionComponent = function RectCollisionComponent(entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function (entity) {
  // the `entity` will have a collision component similar to this one. Based on
  // the type of that other, we can dispatch to a more specific function.
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

  var sizeA = this.size;
  var sizeB = entity.components.collisions.size;

  // measure some dimensions
  var halfWidthA = sizeA.x / 2;
  var halfHeightA = sizeA.y / 2;
  var halfWidthB = sizeB.x / 2;
  var halfHeightB = sizeB.y / 2;

  var totalWidth = sizeA.x + sizeB.x;
  var totalHeight = sizeA.y + sizeB.y;

  // get the boundaries of each rect.
  var leftA = positionA.x - halfWidthA;
  var rightA = positionA.x + halfWidthA;
  var bottomA = positionA.y - halfHeightA;
  var topA = positionA.y + halfHeightA;

  var leftB = positionB.x - halfWidthB;
  var rightB = positionB.x + halfWidthB;
  var bottomB = positionB.y - halfHeightB;
  var topB = positionB.y + halfHeightB;

  // get the boundaries of a rect that would contain both rects inside it.
  var leftMost = Math.min(leftA, leftB);
  var rightMost = Math.max(rightA, rightB);
  var bottomMost = Math.min(bottomA, bottomB);
  var topMost = Math.max(topA, topB);

  // check for overlaps in each dimension separately.
  var overlapX = rightMost - leftMost <= totalWidth;
  var overlapY = topMost - bottomMost <= totalHeight;

  // if both dimensions overlap, then the rects overlap.
  return overlapX && overlapY;
};

module.exports = RectCollisionComponent;
