'use strict';

var DataService = require('./data');

var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

var index = 0;
var teammates;

function initializeApp() {
  DataService.getZignalTeam()
    .then(function(result) {
      // TODO: shuffle result
      teammates = result;
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
  index = getNextIndex(index, teammates);
  renderCard(teammates[index]);
};

function getNextIndex(currentIndex, arr) {
  var nextIndex = currentIndex + 1;
  return (nextIndex >= arr.length) ? 0 : nextIndex;
}

window.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

initializeApp();
