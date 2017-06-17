'use strict';

var app=angular.module('myAppHomeCapo', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/homeCapo',{
        templateUrl: 'capo/homeCapo/homeCapo.html',
        controller: 'myAppHomeCapoCtrl',
        /*IN ATTESA DEL LOGIN
        resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }
        */
    })
}]);



app.controller('myAppHomeCapoCtrl', ['$scope','$rootScope', 'Evento', function($scope,$rootScope, Evento) {

    console.log("e' entrato nel ctrl evento");


    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";
    //get the list of available sq
    $scope.dati.eventi = Evento.getData();
    $scope.dati.eventi.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.eventi.length; i++) {

            var uuid = $scope.dati.eventi[i].$id;
            console.log("Titolo: " + $scope.dati.eventi[i].titolo);
            console.log("Luogo: " + $scope.dati.eventi[i].luogo);
            console.log("Data inizio: " + $scope.dati.eventi[i].dataInizio);

            }
    });







}]);
