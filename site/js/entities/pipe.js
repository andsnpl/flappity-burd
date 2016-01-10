'use strict';

var PipeGraphicsComponent = require('../components/graphics/pipe'),
    PhysicsComponent = require('../components/physics/physics'),
    SoundComponent = require('../components/sound/sound'),
    RectCollisionComponent = require('../components/collisions/rectangle');

/**
 * Object to represent a pipe, either at the top of the screen or the bottom
 *
 * @class
 * @param {number}    startX position on the canvas for the left edge. Should be
 *                           outside the bounds of the screen.
 * @param {number}    height height of the pipe
 * @param {string}    attach where to start drawing the pipe ('T' or 'B' only)
 * @param {function?} passCb function to execute when the pipe is past the
 *                           middle of the screen
 */
var Pipe = function Pipe(startX, height, attach, passCb) {
  this.attach = attach;
  this.height = height;
  this.width = 0.15;

  this.components = {
    graphics: new PipeGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    sound: new SoundComponent(this),
    collisions: new RectCollisionComponent(
      this, { x: this.width, y: this.height })
  };

  // Really hacky. This augments the physics update to check the new position
  // and trigger a callback when it first passes below 0 (i.e., the center of
  // the play area). The cb in this instance ties back to a method of the
  // ObstacleSystem object that created this pipe, which will be overridden by
  // the main module to route through to the UISystem. Only the top pipe even
  // gets this. YUCK. This begs for a refactor.
  var sound = this.components.sound,
      scoreSound = sound.scoreSound.bind(sound);
  this.components.physics.update = function () {
    PhysicsComponent.prototype.update.apply(this, arguments);
    if (passCb && this.position.x <= 0) {
      passCb();
      passCb = null;
      scoreSound();
    }
  };

  // Adding half the width to the left edge to get the horizontal center
  this.components.physics.position.x = startX + (this.width / 2);
  // Find the vertical center based on the attach point and the height
  this.components.physics.position.y = attach === 'T'
    ? 1 - (height / 2)
    : height / 2;
  this.components.physics.velocity.x = -0.35;
};

module.exports = Pipe;
