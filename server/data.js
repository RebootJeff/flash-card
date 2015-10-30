'use strict';

var request = require('request-promise');
var cheerio = require('cheerio');

var DataService = {};

DataService.getZignalTeam = function() {
  // TODO: Running into browser-based CORS problem here
  // (works fine when testing via Node.js)
  return request('http://zignallabs.com/company/')
    .then(extractProfilesFromHtml);
};

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

module.exports = DataService;

function convertObjToArray(obj) {
  var arr = [];

  for(var i = 0; i < obj.length; i++) {
    arr.push(obj[i]);
  }

  return arr;
}
