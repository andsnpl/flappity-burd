'use strict';

var InputSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
};

InputSystem.prototype.run = function () {
  this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function () {
  var burd = this.entities[0];
  burd.components.physics.velocity.y = 0.7;
};

module.exports = InputSystem;
