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
