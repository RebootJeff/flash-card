var data = require('./data');

var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

window.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

window.initializeCard = function() {
  $cardFront.innerHTML = makeCardFrontHtml(data[0]);
  $cardBack.innerHTML = makeCardBackHtml(data[0]);
};

function makeCardFrontHtml(person) {
  return '<img class="profile-photo" src="' + person.imgSrc + '">';
}

function makeCardBackHtml(person) {
  return '<h2>' + person.name + '</h2>' +
         '<h4>' + person.title + '</h4>' +
         '<p>' + person.description + '</p>';
}

initializeCard();
