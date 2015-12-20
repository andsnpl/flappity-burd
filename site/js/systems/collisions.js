'use strict';

var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var entityA = this.entities[i];
    if (!('collisions' in entityA.components)) {
      continue;
    }

    for (var j = i + 1; j < this.entities.length; j++) {
      var entityB = this.entities[j];
      if (!('collisions' in entityB.components)) {
        continue;
      }

      if (!entityA.components.collisions.collidesWith(entityB)) {
        continue;
      }

      if (entityA.components.collisions.onCollision) {
        entityA.components.collisions.onCollision(entityB);
      }

      if (entityB.components.collisions.onCollision) {
        entityB.components.collisions.onCollision(entityA);
      }
    }
  }
};

module.exports = CollisionSystem;
