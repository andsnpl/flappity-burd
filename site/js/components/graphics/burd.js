'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
  this.image = new Image();
  this.image.src = 'images/trump.png';
  this.iWidth = 0;
  this.iHeight = 0;

  this.image.addEventListener('load', () => {
    this.iWidth = this.image.naturalWidth;
    this.iHeight = this.image.naturalHeight;
  });
};

BurdGraphicsComponent.prototype.draw = function (context) {
  var position = this.entity.components.physics.position,
      width = this.entity.radius * 2,
      height = (this.iHeight / this.iWidth || 0) * width;

  context.save();
  context.translate(position.x, position.y);
  context.rotate(-0.3 + this.entity.components.physics.velocity.y / 3);
  context.translate(-this.entity.radius, height / 2);
  context.scale(1, -1);
  context.drawImage(this.image, 0, 0, width, height);
  context.restore();
};

module.exports = BurdGraphicsComponent;
