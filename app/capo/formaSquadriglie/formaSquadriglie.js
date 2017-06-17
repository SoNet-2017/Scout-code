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
    $scope.dati.feedback = "";

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


    $scope.salvaSquadriglie = function(params) {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            console.log("ENTRO NEL salva sq");

            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {
                var uuid = $scope.dati.utenti[i].$id;
                var newSq = $scope.dati.utenti[i].sq;
                console.log("Alla fine " + $scope.dati.utenti[i].nome + " ha la sq " + newSq);

                Utente.aggiornaSq(uuid, newSq);

            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";
    };

}]);

