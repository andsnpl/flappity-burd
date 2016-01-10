'use strict';

var AltLimitGraphicsComponent = require(
      '../components/graphics/altitude-limit'),
    PhysicsComponent = require('../components/physics/physics'),
    RectCollisionComponent = require('../components/collisions/rectangle');

/**
 * Object to represent either the ground or ceiling of the game board.
 *
 * @class
 * @param {number} yPosition how high to draw (center of) this block.
 */
var AltitudeLimit = function AltitudeLimit(yPosition) {
  this.height = 0.02;
  this.width = 10;

  this.components = {
    graphics: new AltLimitGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    collisions: new RectCollisionComponent(
      this, { x: this.width, y: this.height })
  };

  // Physics component has been set up to return its 'time' property to `0` when
  // it reaches the number set in 'period'. Why is it on the physics component?
  // Because that's the only place keeping track of time every frame.
  //
  // note: 0.2 is the distance between stripes on the altitude component when
  // drawn to the screen. 0.35 is the rate of movement left to right per frame,
  // so the resulting period is the distance to move the stripes in each frame
  this.components.physics.period = 0.2 / 0.35;

  this.components.physics.position.x = 0;
  this.components.physics.position.y = (this.height / 2) + yPosition;
};

module.exports = AltitudeLimit;
