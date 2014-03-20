/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

window.selenaApp = angular.module('selenaApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngLivi18n']).
config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        //Routes
        $routeProvider
            .when('/', {
                controller: 'indexCtrl',
                templateUrl: '/views/index.html'
            });
        //Enable html
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);
