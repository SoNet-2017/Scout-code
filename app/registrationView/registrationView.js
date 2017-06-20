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

    $scope.user = {};

    $scope.registration = function(){
        console.log("aggiungiamo il contatto")
        if($scope.user.password!= '' && $scope.user.password === $scope.user.password2) {
            Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
                Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                    var userId = internalFirebaseUser.uid;
                    Users.registerNewUserInfo(userId, $scope.user.nome, $scope.user.cognome, $scope.user.email);
                    Users.registerLogin(userId, $scope.user.email);
                    $location.path("/homeCapo");
                }).catch(function(error){
                    $scope.error=error;
                    console.log(error.message);
                }).catch(function(error){
                    $scope.error=error;
                    console.log(error.message);
                });
            })
        }
    }

}]);