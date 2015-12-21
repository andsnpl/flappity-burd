'use strict';

var BurdGraphicsComponent = require('../components/graphics/burd'),
    PhysicsComponent = require('../components/physics/physics'),
    SoundComponent = require('../components/sound/sound'),
    CircleCollisionComponent = require('../components/collisions/circle');

var Burd = function () {
  this.radius = 0.05;

  this.components = {
    graphics: new BurdGraphicsComponent(this),
    sound: new SoundComponent(this),
    collisions: new CircleCollisionComponent(this, this.radius)
  };

  this.reset();
};

Burd.prototype.reset = function () {
  this.components.physics = new PhysicsComponent();
  this.components.physics.position.y = 0.5;
  this.components.sound.resetSound();
};

Burd.prototype.start = function () {
  this.components.physics.acceleration.y = -1.75;
};

Burd.prototype.flap = function () {
  this.components.physics.velocity.y = 0.55;
  this.components.sound.flapSound();
};

Burd.prototype.die = function () {
  this.components.physics.velocity.y = 0;
  this.components.physics.acceleration.y = 0;
  this.components.sound.dieSound();
};

module.exports = Burd;
