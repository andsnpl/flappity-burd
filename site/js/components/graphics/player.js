'use strict';

/**
 * Object to draw the player's avatar
 *
 * @class
 * @param {*} entity the entity owning this components
 */
var PlayerGraphicsComponent = function PlayerGraphicsComponent(entity) {
  this.entity = entity;
  this.image = new Image();
  this.image.src = 'images/trump.png';

  // Setting initial AR of the image (We don't know!)
  this.imgAspectRatio = 0;

  // Set that AR to match the correct size when it becomes available
  this.image.addEventListener('load', () => {
    var image = this.image;
    this.imgAspectRatio = image.naturalWidth / image.naturalHeight || 0;
  });
};

PlayerGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.radius * 2, // width to draw = width of entity
      height = width / this.imgAspectRatio; // height to draw = proportional

  context.save();

  // Go to the center of the avatar area
  context.translate(position.x, position.y);

  // Player starts to nose down as the velocity goes below 0, or tilt back if
  // velocity higher than 0
  context.rotate(-0.3 + this.entity.components.physics.velocity.y / 3);

  // Move from the center of the player to the corner
  context.translate(-(width / 2), height / 2);

  // Flip y axis (because GraphicsSystem by default sets 0 as bottom of the
  // canvas)
  context.scale(1, -1);

  // Draw Trump
  context.drawImage(this.image, 0, 0, width, height);

  context.restore();
};

module.exports = PlayerGraphicsComponent;
