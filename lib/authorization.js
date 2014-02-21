/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

exports.ensureAuthenicated = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash('alert', global.configs.errors['401'].message);
		return res.redirect('/login');
	}
	next();
};