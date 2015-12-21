'use strict';

var AltLimitGraphicsComponent = function (entity) {
  this.entity = entity;
};

AltLimitGraphicsComponent.prototype.draw = function (context) {
  var physics = this.entity.components.physics,
      position = physics.position,
      width = this.entity.width,
      height = this.entity.height,
      scrollOffset = physics.time / physics.period * 0.2,
      scrollBands = Math.ceil(width / 0.2);

  context.save();
  context.translate(
    position.x - (width / 2) - scrollOffset,
    position.y - (height / 2));
  context.fillStyle = '#7b725b';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#5d4427';
  for (var i = 0; i < scrollBands; i++) {
    context.translate(0.2, 0);
    context.fillRect(0, 0, 0.1, height);
  }
  context.restore();
};

module.exports = AltLimitGraphicsComponent;
