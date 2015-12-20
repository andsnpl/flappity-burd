'use strict';

var UISystem = function () {
  this.splash = document.getElementById('burd-splash');
  this.score = document.getElementById('burd-score');
  this.splash.onclick = () => {
    this.ready();
  };
  this.reset();
};

UISystem.prototype.ready = function () {
  this.splash.style.display = 'none';
  this.score.style.display = 'block';
  this.isReady = true;
};

UISystem.prototype.reset = function () {
  this.splash.style.display = 'block';
  this.score.style.display = 'none';
  this.score.textContent = '0';
  this.isReady = false;
};

UISystem.prototype.bumpScore = function () {
  this.score.textContent = (parseInt(this.score.textContent) + 1).toString();
};

module.exports = UISystem;
