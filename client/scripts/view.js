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
