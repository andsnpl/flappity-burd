'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function (context) {

  // Circle
  context.beginPath();
  context.fillStyle = '#aba4f4';
  context.arc(0, 200, 70, 0, 2 * Math.PI);
  context.fill();

  // Rectangle
  context.beginPath();
  context.fillStyle = '#299';
  context.fillRect(100, 80, 150, 90);

  // Triangle
  context.beginPath();
  context.strokeStyle = '#f00';
  context.lineWidth = 10;
  context.moveTo(200, 150);
  context.lineTo(400, 150);
  context.rotate(Math.PI / 3);
  context.lineTo(400, 150);
  context.closePath();
  context.stroke();
};

module.exports = BurdGraphicsComponent;
