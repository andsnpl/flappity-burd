'use strict';

var SoundComponent = function (entity) {
  this.entity = entity;
  this.sounds = [
      'flap.ogg', 'ching.wav', 'slap.wav',
      'nothappen.mp3', 'runwin.mp3' ]
    .reduce((sounds, fname) => {
      var audio = new Audio('sounds/' + fname);
      audio.load();
      sounds[fname] = audio;
      return sounds;
    }, {});
};

SoundComponent.prototype.playSound = function (fname) {
  var s = this.sounds[fname];
  s.load();
  s.play();
};

SoundComponent.prototype.flapSound = function () {
  this.playSound('flap.ogg');
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
