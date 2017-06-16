'use strict';

var app= angular.module('myAppRegistration', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/registrationView', {
        templateUrl: 'registrationView/registrationView.html',
        controller: 'registrationViewCtrl'
    });
}]);


app.controller('registrationViewCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
    console.log('controller loaded...');
}]);