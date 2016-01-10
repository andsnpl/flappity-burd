'use strict';

var UISystem = function UISystem() {
  this.highScore = localStorage.getItem('ft-high-score') || 0;
  this.endingSplashElt = document.getElementById('ft-ending-splash');
  this.finalScoreElt = document.getElementById('ft-final-score');
  this.highScoreElt = document.getElementById('ft-high-score');
  this.readyButton = document.getElementById('ft-ready-button');
  this.readySplashElt = document.getElementById('ft-ready-splash');
  this.scoreElt = document.getElementById('ft-score');
  this.readyButton.onclick = this.ready.bind(this);
  this.ready();
};

UISystem.prototype.ready = function () {
  this.endingSplashElt.style.display = 'none';
  this.scoreElt.style.display = 'inline-block';
  this.readySplashElt.style.display = 'inline-block';

  this.score = 0;
  this.scoreElt.textContent = '0';
  this.isReady = true;
  this.onReady();
};

UISystem.prototype.onReady = function () {};

UISystem.prototype.start = function () {
  this.endingSplashElt.style.display = 'none';
  this.scoreElt.style.display = 'inline-block';
  this.readySplashElt.style.display = 'none';
};

UISystem.prototype.reset = function () {
  this.highScore = Math.max(this.highScore, this.score);
  localStorage.setItem('ft-high-score', this.highScore);

  this.highScoreElt.textContent = this.highScore.toString();
  this.finalScoreElt.textContent = this.score.toString();

  this.endingSplashElt.style.display = 'inline-block';
  this.scoreElt.style.display = 'none';
  this.readySplashElt.style.display = 'none';
  this.isReady = false;
};

UISystem.prototype.bumpScore = function () {
  this.scoreElt.textContent = (++this.score).toString();
};

module.exports = UISystem;
