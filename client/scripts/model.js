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
