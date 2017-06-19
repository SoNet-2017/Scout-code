'use strict';

var app=angular.module('myAppLogin', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'myAppUtente'
])

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }]);




app.controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', '$location', '$log', 'Utente', function($scope, $rootScope, Auth, $location, $log, Utente) {
    $scope.user={};
    $scope.auth = Auth; //acquires authentication from app.js (if it was done)

    //this function will be called when the "Login" button will be pressed
    $scope.signIn = function() {
        //initialize variables
        $scope.firebaseUser = null;
        $scope.error = null;
        //set the variable that is used in the main template to show the active button

        $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
            var userId = firebaseUser.uid;
            Utente.registerLogin(userId, $scope.user.email);
            // login successful: redirect


            console.log("Login avvenuto");
            /**QUI DEVO CONTROLLARE DOVE VIENE FATTO IL REDIRECT, SE HOME CAPO O HOME RAGAZZO**/


            $scope.dati={};
            $scope.dati.utenti = Utente.getData();
            $scope.dati.utenti.$loaded().then(function () {

                for (var i = 0; i < $scope.dati.utenti.length; i++) {
                    if ($scope.dati.utenti[i].$id == userId) {
                        console.log("Sono entrato nell'if che prende i dati dell'utente loggato");

                        if ($scope.dati.utenti[i].ruolo == 'capo') {
                            $scope.loggato.home = "homecapo";

                            $location.path("/homeCapo");
                            console.log("Redirect su home capo");
                        }
                        else if ($scope.dati.utenti[i].ruolo == 'ragazzo') {
                            $scope.loggato.home = "homeragazzo";

                            //TODO CORREGGERE IL REDIRECT SU HOME RAGAZZO
                            $location.path("/fiamma");
                            console.log("Redirect su fiamma");
                        }

                    }
                }
            });





        }).catch(function(error) {
            $scope.error = error;
            $log.error(error.message);
        });
    };
}]);