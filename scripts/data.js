'use strict';

var R = require('ramda');
var request = require('request-promise');
var cheerio = require('cheerio');

function mineZignalTeamPage() {
  return request('http://zignallabs.com/company/#our-team')
    .then(extractProfilesFromHtml);
}

function extractProfilesFromHtml(htmlString) {
  var $ = cheerio.load(htmlString);
  var $profiles = $('.element-team');
  var jsonProfiles = $profiles.map(function(index, profileEl) {
    var $profile = $(profileEl);
    // extract the following data:
    // - employee category (get value for root element attr `data-project-cat`)
    // - img src (CSS selector: attachment-portfolio-thumb)
    // - employee name (CSS selector: h3 tag)
    // - employee title (CSS selector: b tag)
    // - employee blurb (not sure how to select, but comes after a br tag)
    return {
      category: $profile.attr('data-project-cat'),
      photoUrl: $profile.find('.attachment-portfolio-thumb').attr('src'),
      name: $profile.find('h3').text(),
      title: $profile.find('b').text(),
      blurb: getProfileBlurb($profile)
    };
  });

  // Cheerio's `map` returns a Cheerio collection, so we need to convert to array
  return convertObjToArray(jsonProfiles);
}

// Going after $profile.find('br').get(0).next.data feels hacky?
function getProfileBlurb($profile) {
  var blurbNode = $profile.find('br').get(0);

  if(blurbNode && blurbNode.next) {
    return blurbNode.next.data;
  } else {
    return 'No blurb found. You should bother this person about their lack of blurb';
  }
}

module.exports = [
  {
    name: 'Jeff Lee',
    title: 'Software Engineer',
    category: 'Engineering',
    description: 'Jeff enjoys writing software, teaching code, blogging about engineering, and tweeting all of the above. He binge-watches black hole documentaries, but remains perplexed by the cosmos.',
    imgSrc: 'http://zignallabs.com/wp-content/uploads/2015/10/Jeff_Lee.png'
  }
];

function convertObjToArray(obj) {
  var arr = [];

  for(var i = 0; i < obj.length; i++) {
    arr.push(obj[i]);
  }

  return arr;
}

mineZignalTeamPage().then(function(result) {
  console.log(result);
});
