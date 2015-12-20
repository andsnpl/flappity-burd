'use strict';

var GraphicsSystem = function (entities, canvas) {
  this.entities = entities;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function () {
  var tick = this.tick.bind(this);
  (function recur() {
    global.requestAnimationFrame((t) => {
      tick(t, recur);
    });
  })();
};

GraphicsSystem.prototype.tick = function (t, cb) {
  // Blank slate.
  if (this.canvas.width !== this.canvas.offsetWith ||
      this.canvas.height !== this.canvas.offsetHeight) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  // Render.
  this.entities.forEach((entity) => {
    if (!entity.components || !entity.components.graphics) { return; }
    entity.components.graphics.draw(this.context);
  });

  this.context.restore();

  cb && cb();
};

module.exports = GraphicsSystem;
