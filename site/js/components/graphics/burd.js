'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, this.entity.radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  context.restore();
};

module.exports = BurdGraphicsComponent;
