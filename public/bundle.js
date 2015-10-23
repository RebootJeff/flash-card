(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  return '<img class="profile photo" src="' + person.imgSrc + '">';
}

function makeCardBackHtml(person) {
  return '<h2 class="profile name">' + person.name + '</h2>' +
         '<h4 class="profile title">' + person.title + '</h4>' +
         '<p class="profile description">' + person.description + '</p>';
}

initializeCard();

},{"./data":2}],2:[function(require,module,exports){
module.exports = [
  {
    name: 'Jeff Lee',
    title: 'Software Engineer',
    category: 'Engineering',
    description: 'Jeff enjoys writing software, teaching code, blogging about engineering, and tweeting all of the above. He binge-watches black hole documentaries, but remains perplexed by the cosmos.',
    imgSrc: 'http://zignallabs.com/wp-content/uploads/2015/10/Jeff_Lee.png'
  }
];

},{}]},{},[1]);
