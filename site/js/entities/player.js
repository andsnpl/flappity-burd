'use strict';

var PlayerGraphicsComponent = require('../components/graphics/player'),
    PhysicsComponent = require('../components/physics/physics'),
    SoundComponent = require('../components/sound/sound'),
    CircleCollisionComponent = require('../components/collisions/circle');

/**
 * Object to represont the player's avatar
 *
 * @class
 */
var Player = function Player() {
  this.radius = 0.05;

  this.components = {
    graphics: new PlayerGraphicsComponent(this),
    sound: new SoundComponent(this),
    collisions: new CircleCollisionComponent(this, this.radius)
  };

  this.reset();
};

Player.prototype.reset = function () {
  this.components.physics = new PhysicsComponent();
  this.components.physics.position.y = 0.5;
  this.components.sound.resetSound();
};

Player.prototype.start = function () {
  this.components.physics.acceleration.y = -1.75;
};

Player.prototype.flap = function () {
  this.components.physics.velocity.y = 0.55;
  this.components.sound.flapSound();
};

Player.prototype.die = function () {
  this.components.physics.velocity.y = 0;
  this.components.physics.acceleration.y = 0;
  this.components.sound.dieSound();
};

module.exports = Player;
