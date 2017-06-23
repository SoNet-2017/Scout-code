'use strict';

var app = angular.module('myAppRiepilogoScadenze', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente',
    'myAppSpecialita'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/riepilogoScadenze',{
        templateUrl: 'capo/riepilogoScadenze/riepilogoScadenze.html',
        controller: 'myAppRiepilogoScadenzeCtrl',
        resolve: {
            "currentAuth":["Auth",function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);




app.controller('myAppRiepilogoScadenzeCtrl', ['$scope','$rootScope', 'Utente', 'Scadenza', function($scope,$rootScope, Utente, Scadenza) {
    console.log("e' entrato nel ctrl riepilogo scadenze");


    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();


    /**** FUNZIONE PER ASSEGNARE CLASSI PERSONALIZZATE ****/
    $scope.personalizzaBox = function(deadline, conferma) {
        if (conferma == true) {
            return "box-scadenza scadenza-confermata";

        } else if (conferma == false && deadline < 0 ) {
            return "box-scadenza scadenza-mancata";
        }

        else {
            return "box-scadenza";
        }
    }

}]);
