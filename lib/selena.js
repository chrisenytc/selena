/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/*
 * Module Dependencies
 */

var http = require('./selenaHttp.js');
var https = require('./selenaHttps.js');
require('colors');

/**
 * Constructor
 *
 * @class Selena
 * @constructor
 *
 * @example
 *
 *     var app = selena({http: {port: 8000, mongooseOptions: {}}, https:{port: 4003, mongooseOptions: {}}});
 *
 * @method Selena
 * @param {Object} options The mongoose connect options
 * @return {Object} Returns a instance of http() and https();
 */

function Selena(options) {

  /*
   * Environment.
   */

  //Set options for the API
  options = options || {
    http: {
      port: 22792,
      mongooseOptions: {}
    },
    https: {
      port: 22792,
      mongooseOptions: {}
    }
  };

  //Get settings
  var env = process.env.NODE_ENV || 'development';

  var enableHttps = require('../app/config/' + env + '/app.json').https;
  //
  var selenaHttp = new http(options.http.port, options.http.mongooseOptions);
  //Show log
  console.log('');
  //
  console.log('[ ' + String(selenaHttp.get('port')).bold + ' ]' + ' An instance of the App was started'.cyan);
  //
  console.log('');
  //Create selenaHttps
  var selenaHttps;
  //
  if (enableHttps) {
    selenaHttps = new https(options.https.port, options.https.mongooseOptions);
    //Show log
    console.log('');
    //
    console.log('[ ' + String(selenaHttps.get('port')).bold + ' ]' + ' An instance of the App was started'.cyan);
    //
    console.log('');
  }

  //Return
  return {
    http: selenaHttp,
    https: selenaHttps
  };

}

//Exports
module.exports = Selena;