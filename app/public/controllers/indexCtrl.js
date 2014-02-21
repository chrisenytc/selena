/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

selenaApp.controller('indexCtrl', ['$scope', '$livi18n',
	function indexCtrl($scope, $livi18n) {
		$scope.test = $livi18n.t({
			key: 'messages.welcome'
		});
	}
]);