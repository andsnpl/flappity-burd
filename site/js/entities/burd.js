'use strict';

var BurdGraphicsComponent = require('../components/graphics/burd');

var Burd = function () {
  console.log('Creating burd entity.');

  this.components = {
    graphics: new BurdGraphicsComponent(this);
  };
};

module.exports = Burd;
