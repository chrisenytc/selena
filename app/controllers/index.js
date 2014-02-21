/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

module.exports = {

	/*
	 * GET /
	 */

	index: {
		method: 'GET',
		requireLogin: true,
		fn: function(req, res) {
			res.status(200).render('home/index');
		}
	}
};