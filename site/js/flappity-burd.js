'use strict';

var GraphicsSystem = require('./systems/graphics'),
    PhysicsSystem = require('./systems/physics'),
    InputSystem = require('./systems/input'),
    Burd = require('./entities/burd');

var FlappityBurd = function(canvas) {
  this.entities = [new Burd()];
  this.graphics = new GraphicsSystem(this.entities, canvas);
  this.physics = new PhysicsSystem(this.entities);
  this.input = new InputSystem(this.entities, canvas);
};

FlappityBurd.prototype.run = function () {
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

module.exports = FlappityBurd;
