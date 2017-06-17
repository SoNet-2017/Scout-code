'use strict';

var app = angular.module('myAppFormaSquadriglie', [
    'ngMaterial',
    'ngRoute',
    'myAppSquadriglia'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/formaSquadriglie',{
        templateUrl: 'capo/formaSquadriglie/formaSquadriglie.html',
        controller: 'myAppFormaSquadriglieCtrl',
        /* IN ATTESA DEL LOGIN
         resolve: {
         "currentAuth":["Auth",function(auth) {
         return Auth.$requireSignIn();
         }]
         }
         */
    })
}]);




app.controller('myAppFormaSquadriglieCtrl', ['$scope','$rootScope', 'Utente', function($scope,$rootScope, Utente) {
        console.log("e' entrato nel ctrl forma sq");


    //initialize variables
    $scope.dati={};
    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {

                var uuid = $scope.dati.utenti[i].$id;
                var sqOld =  $scope.dati.utenti[i].sq;
                console.log("All'inizio " + $scope.dati.utenti[i].nome + " ha la sq " + sqOld);
            }
        }
    });








}]);

