'use strict';

var app=angular.module('myAppVisualizzaCartaSpecialita',['ngMaterial', 'ngRoute'])

app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/visualizzaCartaSpecialita/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/visualizzaCartaSpecialita/visualizzaCartaSpecialita.html',
        controller: 'myAppVisualizzaCartaSpecialita'
    })
}])

app.controller('myAppVisualizzaCartaSpecialita',['$scope','$rootScope', '$routeParams', 'Scadenza', '$location', 'CartaSpecialita', 'Utente', function($scope, $rootScope, $routeParams, Scadenza, $location, CartaSpecialita, Utente){
    $scope.dati={}
    $scope.dati.cartaSpec = CartaSpecialita.getData();
    $scope.dati.carteSpec={}

    console.log(""+$routeParams.cartaSpecialitaId)

    $scope.dati.cartaSpec.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
            if ($scope.dati.cartaSpec[i].$id == $routeParams.cartaSpecialitaId) {
                $scope.dati.carteSpec = CartaSpecialita.getCartaInfo($scope.dati.cartaSpec[i].$id);
            }
        }
    })

    console.log(""+$scope.dati.carteSpec.maestro)

    /*$scope.dati.utente=Utente.getData()
    $scope.dati.utente.$loaded().then(function(){
        for(var i = 0; i<$scope.dati.utente.length; i++){
            console.log("sono nel for" + $scope.dati.carteSpec.maestro)
            if($scope.dati.utente[i].$id == $scope.dati.carteSpec.maestro){
                console.log("sono nell'if")
                $scope.dati.maestro=Utente.getUserInfo($scope.dati.utente[i].$id)
                console.log(""+$scope.dati.utente.nome)

            }
        }
    })

    /*$scope.dati.scadenze=Scadenza.getData()
    $scope.dati.scadenza.$loaded().then(function(){
        for(var i = 0; i<$scope.dati.scadenze.length; i++){
            if($scope.dati.scadenze[i].carte_spec==$scope.dati.cartaSpec.$id){
                $scope.dati.scadenza=Scadenza.getScadenzaInfo($scope.dati.scadenze[i].$id)
            }
        }
    })*/



}])