'use strict';

/**
 * Object to draw an altitude limit to the screen
 *
 * This is used on the `AltitudeLimit` entity that represents either ground or
 * ceiling of the gameboard.
 *
 * @class
 * @param {*} entity the entity owning this component
 */
var AltLimitGraphicsComponent = function AltLimitGraphicsComponent(entity) {
  this.entity = entity;
};

AltLimitGraphicsComponent.prototype.draw = function (context) {
  var physics = this.entity.components.physics,
      position = physics.position,
      width = this.entity.width,
      height = this.entity.height,
      // note: physics.time has a fairly arbitrary max value set by the entity,
      // and when it is reached it loops around to zero. This lets us calibrate
      // the position of what we're drawing against a repeating sequence of
      // numbers.
      scrollOffset = physics.time / physics.period * 0.2,

      // The number of colored bands that should be drawn on the rectangle.
      // These help show the motion of the ground over time. They're each 0.1
      // units wide, with 0.1-unit gaps, so the distance between each one is
      // 0.2 units.
      scrollBands = Math.ceil(width / 0.2);

  context.save();
  // *Bing* It is now safe to move about the canvas.

  // Using the scroll offset calculated above to decide where to place the
  // left edge of the rectangle, and thus where the colored bands are going
  // to be.
  context.translate(
    position.x - (width / 2) - scrollOffset,
    position.y - (height / 2));

  // Fill the whole rectangle once.
  context.fillStyle = '#7b725b';
  context.fillRect(0, 0, width, height);

  // Change the fill color
  context.fillStyle = '#5d4427';
  // Fill the bands
  for (var i = 0; i < scrollBands; i++) {
    context.fillRect(0.2 * i, 0, 0.1, height);
  }

  // Fasten your seatbelts, we're returning to the starting position.
  context.restore();
};

module.exports = AltLimitGraphicsComponent;
