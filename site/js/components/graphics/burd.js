'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function () {
  console.log('Drawing a burd.');
  console.log('The burd to draw is-', this.entity);
};

module.exports = BurdGraphicsComponent;
