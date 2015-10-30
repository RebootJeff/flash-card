'use strict';

// Internal dependencies
var DataService = require('./data');

var ctrl = {};

ctrl.getTeammates = function(req, res) {
  DataService.getZignalTeam()
    .then(function(result) {
      res.send(result);
    })
    .catch(function(err) {
      console.error('\nctrl.getTeammates error:\n', JSON.stringify(err));
      res.status(500).send(err.message);
    });
};


module.exports = ctrl;
