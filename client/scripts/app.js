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
