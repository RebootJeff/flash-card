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
  // FIXME: Instead of flipping card, app should ALWAYS return to front-side
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
