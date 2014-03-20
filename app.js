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

var Server = require('./lib/selena.js');

/*
 * Example
 *
 * var App = Server({http: {port: 8000, options: {}}, https:{port: 4300, options: {}}});
 */

var App = Server({
    http: {
        port: 22792
    },
    https: {
        port: 4300
    }
});

//Exports
exports = module.exports = App;
