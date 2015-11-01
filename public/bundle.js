(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Internal dependencies
var View = require('./view');
var Model = require('./model');

function initializeApp() {
  Model.initialize(function() {
    View.renderCard(Model.nextTeammate());
    View.hideLoadingScreen();
  });
}

window.nextCard = function() {
  var delay = 0;

  if(View.isCardFlipped()) {
    View.showCardFront();
    delay = 600;
  }

  // Card will show next backside before flipping animation finishes
  // TODO: find a way to address this problem this without setTimeout
  setTimeout(function() {
    View.renderCard(Model.nextTeammate());
  }, delay);
};

window.flipCard = View.flipCard;

initializeApp();

},{"./model":2,"./view":4}],2:[function(require,module,exports){
'use strict';

// Internal dependencies
var Utils = require('./utils');

var Model = {};

var index = -1;
var teammates = [];

Model.initialize = function(cb) {
  Utils.sendGetRequest('/api/teammates', function(result) {
    teammates = Utils.shuffle(result);
    cb();
  });
};

Model.nextTeammate = function() {
  index = getNextIndex(index, teammates);
  return teammates[index];
};

function getNextIndex(currentIndex, arr) {
  var nextIndex = currentIndex + 1;
  return (nextIndex >= arr.length) ? 0 : nextIndex;
}

module.exports = Model;

},{"./utils":3}],3:[function(require,module,exports){
'use strict';

var Utils = {};

Utils.shuffle = function(sourceArray) {
  var shuffledArray = [];
  var randomIndex;

  sourceArray.forEach(function(element, i) {
    shuffledArray.push(element);

    randomIndex = getRandomNumber(0, i);
    swap(i, randomIndex, shuffledArray);
  });

  return shuffledArray;
};

function getRandomNumber(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

function swap(i, j, array) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

Utils.sendGetRequest = function(url, success, error) {
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      success(JSON.parse(request.responseText));
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.send();
};

module.exports = Utils;

},{}],4:[function(require,module,exports){
'use strict';

var View = {};

var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

View.hideLoadingScreen = function() {
  document.querySelector('.loading-screen').style.display = 'none';
};

View.renderCard = function(person) {
  $cardFront.innerHTML = makeCardFrontHtml(person);
  $cardBack.innerHTML = makeCardBackHtml(person);
};

function makeCardFrontHtml(person) {
  return '<img class="profile-photo" src="' + person.photoUrl + '" alt="profile photo">';
}

function makeCardBackHtml(person) {
  return '<h2 class="profile-name">' + person.name + '</h2>' +
         '<h4 class="profile-title">' + person.title + '</h4>' +
         '<p class="profile-blurb">' + person.blurb + '</p>';
}

View.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

View.isCardFlipped = function() {
  return $flipContainer.classList.contains('flip');
};

View.showCardFront = function() {
  $flipContainer.classList.remove('flip');
};

module.exports = View;

},{}]},{},[1]);
