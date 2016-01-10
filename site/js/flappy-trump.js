'use strict';

var GraphicsSystem = require('./systems/graphics'),
    PhysicsSystem = require('./systems/physics'),
    InputSystem = require('./systems/input'),
    ObstacleSystem = require('./systems/obstacles'),
    UISystem = require('./systems/ui'),
    Player = require('./entities/player');

/**
 * Game state manager
 *
 * @class
 * @param {HTMLCanvasElement} canvas what to draw on
 */
var FlappyTrump = function FlappyTrump(canvas) {
  this.player = new Player();
  this.entities = [this.player];

  this.graphics = new GraphicsSystem(this.entities, canvas);
  this.physics = new PhysicsSystem(this.entities);
  this.input = new InputSystem(this.entities, canvas);
  this.obstacles = new ObstacleSystem(this.entities, canvas);
  this.ui = new UISystem();

  this.obstacles.onPassObstacle = () => {
    this.ui.bumpScore();
  };

  this.player.components.collisions.onCollision = () => {
    this.obstacles.pause();
    this.graphics.pause();
    this.physics.pause();
    this.input.started = false;
    this.ui.reset();
    this.player.die();
  };

  this.ui.onReady = () => {
    this.player.reset();
    this.obstacles.reset();
    this.graphics.run();
    this.physics.run();
  };
};

FlappyTrump.prototype.run = function () {
  this.graphics.run();
  this.input.run();
  this.physics.run();
  this.input.onStartGame = () => {
    if (!this.ui.isReady) { return false; }
    this.obstacles.run();
    this.ui.start();
    this.player.start();
    return true;
  };
};

module.exports = FlappyTrump;
