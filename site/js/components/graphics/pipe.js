'use strict';

var PipeGraphicsComponent = function (entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.width,
      height = this.entity.height,
      gap = this.entity.gap;

  context.save();
  context.translate(position.x - (width / 2), 0);
  context.fillStyle = 'green';
  context.fillRect(position.x, position.y, width, height);
  context.restore();
};

module.exports = PipeGraphicsComponent;
