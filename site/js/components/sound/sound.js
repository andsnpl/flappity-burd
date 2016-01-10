'use strict';

/**
 * Object to play any sound the game knows about.
 *
 * @class
 * @param {*} entity the entity owning this component
 */
var SoundComponent = function SoundComponent(entity) {
  this.entity = entity;
};

// Static property
SoundComponent.sounds = [
  // filenames used to make sounds in the app.
  'flap.wav', 'ching.wav', 'slap.wav', 'nothappen.mp3', 'runwin.mp3'
]
  // convert from array of names to a mapping (object) that associates names
  // to audio elements.
  .reduce((sounds, fname) => {
    sounds[fname] = new Audio('sounds/' + fname);
    sounds[fname].load(); // Preload each element so it can play on demand.
    return sounds;
  }, {});

SoundComponent.prototype.playSound = function (fname) {
  var s = SoundComponent.sounds[fname];
  s.load();
  s.play();
};

SoundComponent.prototype.flapSound = function () {
  this.playSound('flap.wav');
};

SoundComponent.prototype.scoreSound = function () {
  this.playSound('ching.wav');
};

SoundComponent.prototype.dieSound = function () {
  this.playSound('slap.wav');
  this.playSound('nothappen.mp3');
};

SoundComponent.prototype.resetSound = function () {
  this.playSound('runwin.mp3');
};

module.exports = SoundComponent;
