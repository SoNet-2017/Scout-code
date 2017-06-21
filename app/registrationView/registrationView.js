'use strict';

var app= angular.module('myAppRegistration', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/registrationView', {
        templateUrl: 'registrationView/registrationView.html',
        controller: 'myAppRegistrationViewCtrl'
    });
}]);

app.controller('myAppRegistrationViewCtrl', ['$scope', '$rootScope', 'Auth', 'Utente', '$location', function($scope, $rootScope, Auth, Utente, $location) {

    console.log('registration view controller');

    $scope.user={};



    $scope.signUp = function() {
        console.log("Entra nella function signUp");
        //check if the second password is equal to the first one
        if ($scope.user.password!= '' && $scope.user.password === $scope.user.password2) {
            console.log("Password uguali");
            //create a new user with specified email and password
            Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function (firebaseUser) {
                    //after creating the user, we will perform a login and then the new information will be saved in the database
                    //(the reason is that we cannot write in the database if we are not logged in ... it is not the best way of doing it but it is ok for our prototype)
                    Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                        var userId = internalFirebaseUser.uid;
                        Utente.registerNewUserInfo(userId, $scope.user.nome, $scope.user.cognome, $scope.user.email, $scope.user.codice);

                        console.log("Registrazione avvenuta con successo");

                        Utente.registerLogin(userId, $scope.user.email);

                        console.log("Login avvenuto con successo, redirect su homeCapo");
                        // login successful: redirect to the pizza list
                        $location.path("/homeCapo");
                    }).catch(function(error) {
                        $scope.error = error;
                        console.log(error.message);
                    });
                }).catch(function (error) {
                $scope.error = error;
                console.log(error.message);
            });
        }
        else {
            console.log("Password diverse");
        }
    };
}]);