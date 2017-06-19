'use strict';

var app= angular.module('myAppRegistration', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/registrationView', {
        templateUrl: 'registrationView/registrationView.html',
        controller: 'myAppRegistrationViewCtrl'
    });
}]);


app.controller('myAppRegistrationViewCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', function($scope, $rootScope, Auth, Users, $location) {
    console.log('registration view controller');

    $scope.dati = {};

    $scope.registration = function(){
        console.log("aggiungiamo il contatto")
        if($scope.user.password){
            
        }
    }
}]);