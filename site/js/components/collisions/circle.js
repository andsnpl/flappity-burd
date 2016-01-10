'use strict';

// function to lock a number between a minimum and maximum value.
var clamp = require('../../helpers').clamp;


/**
 * Object to represent a circular area and check if another entity is inside.
 *
 * Other code should use the `collidesWith()` method to test for collisions.
 *
 * @class
 * @param {*}      entity the entity owning this component
 * @param {number} radius radius of the collision area
 */
var CircleCollisionComponent
  = function CircleCollisionComponent(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.size = { x: radius, y: radius };
    this.type = 'circle';
  };

CircleCollisionComponent.prototype.collidesWith = function (entity) {
  // `entity` will have a counterpart collision component similar to this one.
  // dispatch to more specific functions for collision based on the type of that
  // other component.
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

  var diffX = positionA.x - positionB.x;
  var diffY = positionA.y - positionB.y;

  // Square of the distance between this component's center and the center of
  // the `entity`
  var distanceSquared = Math.pow(diffX, 2) + Math.pow(diffY, 2);

  // Minimum distance between two circles that do not overlap is the total of
  // both radii.
  var bothRadii = radiusA + radiusB;
  var bothRadiiSquared = Math.pow(bothRadii, 2);

  // if [current distance]^2 is less than [minimum distance]^2 there must be
  // overlap.
  return distanceSquared < bothRadiiSquared;
};

CircleCollisionComponent.prototype.collideRect = function (entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collisions.size;

  var halfWidthB = sizeB.x / 2;
  var halfHeightB = sizeB.y / 2;

  // These are the boundaries of the rect passed in as `entity`
  var rightB = positionB.x + halfWidthB;
  var leftB = positionB.x - halfWidthB;
  var topB = positionB.y + halfHeightB;
  var bottomB = positionB.y - halfHeightB;

  // The X and Y values that are closest to center of this component but still
  // within the bounds of the rect as defined above
  var closestX = clamp(positionA.x, leftB, rightB);
  var closestY = clamp(positionA.y, bottomB, topB);

  var diffX = positionA.x - closestX;
  var diffY = positionA.y - closestY;

  // Square of the distance between this component's center and the closest
  // part of the `entity`.
  var distanceSquared = diffX * diffX + diffY * diffY;

  // Square of the distance between this component's center and its edge.
  var radiusSquared = this.radius * this.radius;

  // If `distanceSquared` is lower, then there is a part of the `entity` that
  // is closer to the center of the circle than its own edge, and we have a
  // collision.
  return distanceSquared < radiusSquared;
};

module.exports = CircleCollisionComponent;
