'use strict';

// External dependencies
var helmet = require('helmet');

var config = {
  ENV:  process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000
};

config.enableSecurityFeatures = function(app) {
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard('deny'));
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
};

module.exports = config;
