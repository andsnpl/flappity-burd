'use strict';

/**
 * Object to draw a pipe to the screen.
 *
 * @class
 * @param {*} entity the entity owning this component
 */
var PipeGraphicsComponent = function PipeGraphicsComponent(entity) {
  this.entity = entity;
  this.image = new Image();
  this.image.src = 'images/pipe-top.png';
};

PipeGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.width,
      height = this.entity.height,
      attachT = this.entity.attach === 'T'; // Is this a top pipe or bottom?

  context.save();
  context.translate(position.x - (width / 2), attachT ? 1 - height : 0);
  context.fillStyle = '#07c300';
  context.fillRect(0, 0, width, height);

  // Draw the lip of the pipe
  context.translate(-0.005, attachT ? 0 : height - 0.05);
  context.drawImage(this.image, 0, 0, width + 0.01, 0.05);
  context.restore();
};

module.exports = PipeGraphicsComponent;
