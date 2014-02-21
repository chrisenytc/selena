/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

$(function() {
	//Fixing facebook bug with redirect
	if (String(window.location.hash) === "#_=_") {
		window.location.hash = "";
	}

	//Then init the app
	livi18n.init(location.origin, ['messages'], function() {
		//Init AngularJS
		angular.bootstrap(document, ['selenaApp']);
	});
});