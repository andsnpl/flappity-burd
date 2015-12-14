'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function (context) {
  context.beginPath();
  context.arc(0, .5, .2, 0, 2 * Math.PI);
  context.fill();
};

module.exports = BurdGraphicsComponent;
