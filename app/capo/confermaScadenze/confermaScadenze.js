'use strict';

var app = angular.module('myAppConfermaScadenze', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente',
    'myAppSpecialita'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/confermaScadenze',{
        templateUrl: 'capo/confermaScadenze/confermaScadenze.html',
        controller: 'myAppConfermaScadenzeCtrl',
        resolve: {
            "currentAuth":["Auth",function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);




app.controller('myAppConfermaScadenzeCtrl', ['$scope','$rootScope', 'Utente', 'Scadenza', 'Specialita', function($scope,$rootScope, Utente, Scadenza, Specialita) {
    console.log("e' entrato nel ctrl conferma scadenze");


    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";
    $scope.modulo = "";
    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].ruolo == 'capo') {

                var uuid = $scope.dati.utenti[i].$id;
                var checkedOld =  $scope.dati.utenti[i].staff;
                console.log("All'inizio " + $scope.dati.utenti[i].nome + " ha il toggle " + checkedOld);
            }
        }
    });

    $scope.dati.scadenze = Scadenza.getData();
    $scope.dati.specialita = Specialita.getData();



    $scope.salvaStaff = function(params) {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            console.log("ENTRO NEL salva staff");

            if ($scope.dati.utenti[i].ruolo == 'capo') {
                var uuid = $scope.dati.utenti[i].$id;
                var codiceCicloi = $scope.dati.utenti[i].codice;
                var switchCicloi = document.getElementById(codiceCicloi);
                var checked =  switchCicloi.getAttribute("aria-checked");
                console.log("Alla fine " + $scope.dati.utenti[i].nome + " ha il toggle " + checked);


                Utente.aggiornaStaff(uuid, checked);


            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";

    };




}]);

