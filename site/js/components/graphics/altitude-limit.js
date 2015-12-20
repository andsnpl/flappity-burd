'use strict';

var AltLimitGraphicsComponent = function (entity) {
  this.entity = entity;
};

AltLimitGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.width,
      height = this.entity.height;

  context.save();
  context.translate(position.x - (width / 2), 0);
  context.fillStyle = 'brown';
  context.fillRect(0, 0, width, height);
  context.restore();
};

module.exports = AltLimitGraphicsComponent;
