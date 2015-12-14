'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function (context) {
  context.fillStyle = '#aba4f4';
  context.beginPath();
  context.arc(0, 200, 70, 0, 2 * Math.PI);
  context.fill();
};

module.exports = BurdGraphicsComponent;
