(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Internal dependencies
var Utils = require('./utils');

var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

var index = 0;
var teammates;

function initializeApp() {
  Utils.sendGetRequest('/api/teammates', function(result) {
    teammates = Utils.shuffle(result);
    renderCard(teammates[index]);
    hideLoadingScreen();
  });
}

function hideLoadingScreen() {
  document.querySelector('.loading-screen').style.display = 'none';
}

function renderCard(person) {
  $cardFront.innerHTML = makeCardFrontHtml(person);
  $cardBack.innerHTML = makeCardBackHtml(person);
}

function makeCardFrontHtml(person) {
  return '<img class="profile-photo" src="' + person.photoUrl + '" alt="profile photo">';
}

function makeCardBackHtml(person) {
  return '<h2 class="profile-name">' + person.name + '</h2>' +
         '<h4 class="profile-title">' + person.title + '</h4>' +
         '<p class="profile-blurb">' + person.blurb + '</p>';
}


window.nextCard = function() {
  var delay = 0;
  index = getNextIndex(index, teammates);

  if($flipContainer.classList.contains('flip')) {
    $flipContainer.classList.remove('flip');
    delay = 600;
  }

  // Card will show next backside before flipping animation finishes
  // TODO: find a way to address this problem this without setTimeout
  setTimeout(function() {
    renderCard(teammates[index]);
  }, delay);
};

function getNextIndex(currentIndex, arr) {
  var nextIndex = currentIndex + 1;
  return (nextIndex >= arr.length) ? 0 : nextIndex;
}

window.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

initializeApp();

},{"./utils":2}],2:[function(require,module,exports){
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

module.exports = Utils;

},{}]},{},[1]);
