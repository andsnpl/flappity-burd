'use strict';

var InputSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.started = false;
};

InputSystem.prototype.run = function () {
  this.canvas.addEventListener('mousedown', this.onClick.bind(this));
  this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
  this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
  this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
  this.canvas.addEventListener('touchcancel', this.onTouchCancel.bind(this));
};

InputSystem.prototype.onClick = function (evt) {
  evt.preventDefault();
  if (!this.started && this.onStartGame()) {
    this.started = true;
  }
  var burd = this.entities[0];
  burd.components.physics.velocity.y = 0.55;
};

InputSystem.prototype.onTouchStart = function (evt) {
  evt.preventDefault();
  this.touching || this.onClick();
  this.touching = true;
};

InputSystem.prototype.onTouchEnd = function (evt) {
  evt.preventDefault();
  this.touching = false;
};

InputSystem.prototype.onTouchMove = function (evt) {
  evt.preventDefault();
};

InputSystem.prototype.onTouchCancel = function (evt) {
  evt.preventDefault();
  this.touching = false;
};

module.exports = InputSystem;
