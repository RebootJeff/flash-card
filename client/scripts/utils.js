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

Utils.sendGetRequest = function(url, success, error) {
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
};

module.exports = Utils;
