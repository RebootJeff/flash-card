var data = require('./data');

var $flipContainer = document.querySelector('.flipper');
var $cardFront = document.querySelector('.front');
var $cardBack = document.querySelector('.back');

var index = 0;

window.nextCard = function() {
  index = getNextIndex(index, data);
  renderCard(data[index]);
}

function getNextIndex(currentIndex, arr) {
  var nextIndex = currentIndex + 1;
  return (nextIndex >= arr.length) ? 0 : nextIndex;
}

window.flipCard = function() {
  $flipContainer.classList.toggle('flip');
};

function renderCard(person) {
  $cardFront.innerHTML = makeCardFrontHtml(person);
  $cardBack.innerHTML = makeCardBackHtml(person);
}

function makeCardFrontHtml(person) {
  return '<img class="profile-photo" src="' + person.imgSrc + '" alt="profile photo">';
}

function makeCardBackHtml(person) {
  return '<h2 class="profile-name">' + person.name + '</h2>' +
         '<h4 class="profile-title">' + person.title + '</h4>' +
         '<p class="profile-description">' + person.description + '</p>';
}

renderCard(data[index]);

setTimeout(function() {
  // document.querySelector('.loading-screen').style.display = 'none';
}, 1000);
