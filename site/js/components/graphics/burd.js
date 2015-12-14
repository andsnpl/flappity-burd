'use strict';

var BurdGraphicsComponent = function (entity) {
  this.entity = entity;
};

BurdGraphicsComponent.prototype.draw = function (context, t) {
  var ox = 600,
      oy = 350,
      animRadius = 25,
      animAngle = 2 * Math.PI * ((t / 1000) % 5), // Full rotation in 5s
      offsetX = ox + (animRadius * Math.cos(animAngle)),
      offsetY = oy + (animRadius * Math.sin(animAngle));

  // Circle
  context.beginPath();
  context.fillStyle = '#aba4f4';
  context.arc(-50 + offsetX, 50 + offsetY, 70, 0, 2 * Math.PI);
  context.fill();

  // Rectangle
  context.beginPath();
  context.fillStyle = '#299';
  context.fillRect(0 + offsetX, 0 + offsetY, 150, 90);

  // Triangle
  context.beginPath();
  context.strokeStyle = '#f00';
  context.lineWidth = 10;
  context.moveTo(200 + offsetX, 150 + offsetY);
  context.lineTo(400, 150);
  context.rotate(Math.PI / 3);
  context.lineTo(400, 150);
  context.closePath();
  context.stroke();
};

module.exports = BurdGraphicsComponent;
