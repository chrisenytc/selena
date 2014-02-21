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

var server = require('./lib/selena.js');

/*
 * Example
 *
 * var app = server({http: {port: 8000, options: {}}, https:{port: 4300, options: {}}});
 */

var app = server({
	http: {
		port: 22792
	},
	https: {
		port: 4300
	}
});

//Exports
exports = module.exports = app;