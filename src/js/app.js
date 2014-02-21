/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

var app = angular.module('selenaApp', ['ngRoute']);

app.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/index.html',
      controller: 'indexCtrl'
    }).when('/middlewares', {
      templateUrl: 'views/middlewares.html',
      controller: 'middlewareCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);

// Modal

$(document).ready(function() {

  /* This is basic - uses default settings */

  $('a.fancybox').fancybox({
    type: "iframe",
    width: 626,
    height: 420
  });

});