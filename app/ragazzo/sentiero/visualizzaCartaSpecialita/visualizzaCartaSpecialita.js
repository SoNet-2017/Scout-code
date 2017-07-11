'use strict';

var app=angular.module('myAppVisualizzaCartaSpecialita',['ngMaterial', 'ngRoute'])

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/visualizzaCartaSpecialita/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/visualizzaCartaSpecialita/visualizzaCartaSpecialita.html',
        controller: 'myAppVisualizzaCartaSpecialita'
    })
}])

app.controller('myAppVisualizzaCartaSpecialita',['$scope','$rootScope', '$routeParams', 'Scadenza', '$location', 'CartaSpecialita', 'Utente', function($scope, $rootScope, $routeParams, Scadenza, $location, CartaSpecialita, Utente ){
    $scope.dati={}
    $scope.dati.cartaSpec = CartaSpecialita.getData();

    console.log(""+$routeParams.cartaSpecialitaId)

    $scope.dati.utente=Utente.getData()
    $scope.dati.cartaSpec.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
            if ($scope.dati.cartaSpec[i].$id == $routeParams.cartaSpecialitaId) {
                $scope.dati.carteSpec = CartaSpecialita.getCartaInfo($scope.dati.cartaSpec[i].$id);
                console.log(""+$scope.dati.cartaSpec[i].maestro)
                for(var j = 0; j<$scope.dati.utente.length; j++){
                    if($scope.dati.utente[j].codice==$scope.dati.cartaSpec[i].maestro){
                        console.log("ci siamo quasi" + $scope.dati.utente[j].nome)
                        $scope.dati.maestro=Utente.getUserInfo($scope.dati.utente[j].$id)
                    }
                }
            }
        }
    })


    $scope.dati.valoreIdCarta=$routeParams.cartaSpecialitaId
    $scope.dati.scadenze=Scadenza.getData()


    /**** FUNZIONE PER ASSEGNARE CLASSI PERSONALIZZATE ****/
    $scope.personalizzaBox = function(deadline, conferma) {
        if (conferma == true) {
            return "border-scadenza-confermata";

        } else if (conferma == false && deadline < 0 ) {
            return "border-scadenza-mancata";
        }

        else {
            return "border-scadenza";
        }
    };



}])