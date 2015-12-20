'use strict';

var PipeGraphicsComponent = function (entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.width,
      height = this.entity.height,
      attachT = this.entity.attach === 'T';

  context.save();
  context.translate(position.x - (width / 2), attachT ? 1 - height : 0);
  context.fillStyle = 'green';
  context.fillRect(0, 0, width, height);
  context.restore();
};

module.exports = PipeGraphicsComponent;
