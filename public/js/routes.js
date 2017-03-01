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
            .when('/hyperVDash', {
                templateUrl : 'view/hyperV.html',
                controller : 'hyperVctrl'                
            })
            .when('/cserver', {
                templateUrl : 'view/cserver.html',
                controller : 'cserverctrl'
            })
            .when('/cHyperVserver', {
                templateUrl : 'view/cHyperVserver.html',
                controller : 'cHyperVserverctrl'
            })            
            .when('/', {
                templateUrl : 'view/start.html',
                controller : 'startctrl'
            })
    }]);