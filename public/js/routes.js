/**
 * Created by bhanu.mokkala on 2/20/2017.
 */
'use strict';

angular.module("infralab")
    .config(['$routeProvider', '$locationProvider', '$mdThemingProvider',function($routeProvider, $locationProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('blue');
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');
        $routeProvider
            .when('/dashboard', {
                templateUrl : 'view/dashboard.html',
                controller : 'dbctrl'
            })
            .when('/cserver', {
                templateUrl : 'view/cserver.html',
                controller : 'cserverctrl'
            })
            .when('/', {
                templateUrl : 'view/start.html',
                controller : 'startctrl'
            })
    }]);