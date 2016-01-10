'use strict';

/**
 * Object to draw a pipe to the screen.
 *
 * @class
 * @param {*} entity the entity owning this component
 */
var PipeGraphicsComponent = function PipeGraphicsComponent(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.width,
      height = this.entity.height,
      attachT = this.entity.attach === 'T'; // Is this a top pipe or bottom?
                  // (determines the color to paint)

  context.save();
  context.translate(position.x - (width / 2), attachT ? 1 - height : 0);
  context.fillStyle = attachT ? 'red' : 'blue';
  context.fillRect(0, 0, width, height);
  context.restore();
};

module.exports = PipeGraphicsComponent;
