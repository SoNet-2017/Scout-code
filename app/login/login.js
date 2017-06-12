'use strict';

var app=angular.module('myAppLogin', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }]);

app.controller('LoginCtrl', ['$scope',function($scope) {
        $scope.user={

        };
    }]);