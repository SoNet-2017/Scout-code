'use strict';

var app = angular.module('myAppVisualizzaCartaCompetenza', ['ngMaterial', 'ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/visualizzaCartaCompetenza/:cartaCompetenzaId', {
        templateUrl: 'ragazzo/sentiero/visualizzaCartaCompetenza/visualizzaCartaCompetenza.html',
        controller: 'myAppVisualizzaCartaCompetenzaCtrl'
    })
}])

app.controller('myAppVisualizzaCartaCompetenzaCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Brevetti', 'CartaCompetenza', 'CartaSpecialita', 'Utente', 'Scadenza',
    function ($scope, $rootScope, $routeParams, $location, Brevetti, CartaCompetenza, CartaSpecialita, Utente, Scadenza) {
        $scope.dati = {}
        $scope.dati.cartaComp = CartaCompetenza.getData();

        console.log("" + $routeParams.cartaCompetenzaId);

        $scope.dati.cartaSpec=CartaSpecialita.getData();

        $scope.dati.utente = Utente.getData()
        $scope.dati.cartaComp.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.cartaComp.length; i++) {
                if ($scope.dati.cartaComp[i].$id == $routeParams.cartaCompetenzaId) {
                    $scope.dati.carteComp = CartaCompetenza.getCartaInfo($scope.dati.cartaComp[i].$id);
                    console.log("" + $scope.dati.cartaComp[i].maestro)
                    for (var j = 0; j < $scope.dati.utente.length; j++) {
                        if ($scope.dati.utente[j].codice == $scope.dati.cartaComp[i].maestro) {
                            console.log("ci siamo quasi" + $scope.dati.utente[j].nome)
                            $scope.dati.maestro = Utente.getUserInfo($scope.dati.utente[j].$id)
                            console.log("" + $scope.dati.utente[j].$id)
                        }
                    }
                }
            }
        })



        /*
        $scope.dati.scadenze = Scadenza.getData()


        $scope.dati.cartaSpec.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
                for (var j = 0; j < $scope.dati.scadenze.length; j++) {
                    if ($scope.dati.scadenze[j].carta_spec == $scope.dati.cartaSpec[i].$id) {
                        //console.log("entro nel if scadenza appartiene a carta attuale")
                        if ($scope.dati.scadenze[j].conferma == false) {
                            //console.log("trovo una scadenza non confermata")
                            $scope.dati.cartaSpec[i].attiva = true;
                            //console.log("La carta " + $scope.dati.cartaSpec[i].$id + " è attiva");
                        }
                    }
                }
            }
        });
        */


    }])