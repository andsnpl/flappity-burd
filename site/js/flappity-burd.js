'use strict';

var GraphicsSystem = require('./systems/graphics'),
    PhysicsSystem = require('./systems/physics'),
    InputSystem = require('./systems/input'),
    ObstacleSystem = require('./systems/obstacles'),
    UISystem = require('./systems/ui'),
    Burd = require('./entities/burd');

var FlappityBurd = function(canvas) {
  this.burd = new Burd();
  this.entities = [this.burd];

  this.graphics = new GraphicsSystem(this.entities, canvas);
  this.physics = new PhysicsSystem(this.entities);
  this.input = new InputSystem(this.entities, canvas);
  this.obstacles = new ObstacleSystem(this.entities, canvas);
  this.ui = new UISystem();

  this.obstacles.onPassObstacle = () => {
    this.ui.bumpScore();
  };

  this.burd.components.collisions.onCollision = () => {
    this.obstacles.pause();
    this.graphics.pause();
    this.physics.pause();
    this.input.started = false;
    this.ui.reset();
    this.burd.die();
  };

  this.ui.onReady = () => {
    this.burd.reset();
    this.obstacles.reset();
    this.graphics.run();
    this.physics.run();
  };
};

FlappityBurd.prototype.run = function () {
  this.graphics.run();
  this.input.run();
  this.physics.run();
  this.input.onStartGame = () => {
    if (!this.ui.isReady) { return false; }
    this.obstacles.run();
    this.ui.start();
    this.burd.start();
    return true;
  };
};

module.exports = FlappityBurd;
