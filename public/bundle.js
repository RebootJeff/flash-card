(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';



var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

var index = 0;
var teammates;

function initializeApp() {
  sendGetRequest('/api/teammates', function(result) {
    // TODO: shuffle result
    teammates = result;
    renderCard(teammates[index]);
    hideLoadingScreen();
  });
}

function sendGetRequest(url, success, error) {
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
  index = getNextIndex(index, teammates);
  flipCard();

  // FIXME: Card will show next backside before flipping animation finishes
  // TODO: find a way to address this problem this without setTimeout
  setTimeout(function() {
    renderCard(teammates[index]);
  }, 600);
};

function getNextIndex(currentIndex, arr) {
  var nextIndex = currentIndex + 1;
  return (nextIndex >= arr.length) ? 0 : nextIndex;
}

window.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

initializeApp();

},{}]},{},[1]);
