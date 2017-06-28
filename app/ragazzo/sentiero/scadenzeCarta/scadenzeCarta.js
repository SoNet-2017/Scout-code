'use strict';

var app=angular.module('myAppScadenzeCarta', [
    'ngMaterial',
    'ngRoute'

])

app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/scadenzeCarta/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/scadenzeCarta/scadenzeCarta.html',
        controller: 'myAppScadenzeCartaCtrl'
    })
}]);

app.controller('myAppScadenzeCartaCtrl', ['$scope','$rootScope', '$routeParams', 'Scadenza', '$location', 'CartaSpecialita', function($scope, $rootScope, $routeParams, Scadenza, $location, CartaSpecialita){
    $scope.dati={};
    $scope.dati.cartaSpec=$routeParams.cartaSpecialitaId
    $scope.status = '  ';
    $scope.dati.carteSpec=CartaSpecialita.getData();
    $scope.customFullscreen = false
    $scope.dati.myDate1=new Date()
    $scope.dati.myDate2=new Date()
    $scope.dati.myDate3=new Date()
    $scope.dati.myDate4=new Date()
    $scope.dati.today=new Date()

    $scope.dati.nomeRagazzo=$rootScope.info.user
    $scope.dati.deadline="50";

    /*$scope.dati.nomeSpec.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
            if ($scope.dati.cartaSpec[i].$id == $routeParams.cartaSpecialitaId) {
                $scope.dati.nomeSpec = CartaSpecialita.getCartaInfo($scope.dati.cartaSpec[i].$id);
            }
        }
    })*/




    $scope.salvaScadenze=function(){

        $scope.dati.feedback = "";
        $scope.dati.error = "";

        console.log("ho premuto su salva");

        if($scope.dati.azione1 != undefined && $scope.dati.azione1 != "" && $scope.dati.myDate1 != $scope.dati.today){
            $scope.registraScadenza($scope.dati.azione1, $scope.dati.myDate1);
        }
        if($scope.dati.azione2 != undefined && $scope.dati.azione2 != "" && $scope.dati.myDate2 != $scope.dati.today){
            $scope.registraScadenza($scope.dati.azione2, $scope.dati.myDate2);
        }
        if($scope.dati.azione3 != undefined && $scope.dati.azione3 != "" && $scope.dati.myDate3 != $scope.dati.today){
            $scope.registraScadenza($scope.dati.azione3, $scope.dati.myDate3);
        }
        if($scope.dati.azione4 != undefined && $scope.dati.azione4 != "" && $scope.dati.myDate4 != $scope.dati.today){
            $scope.registraScadenza($scope.dati.azione4, $scope.dati.myDate4);
        }

        $location.path("/visualizzaCartaSpecialita/" + $routeParams.cartaSpecialitaId);
                 $scope.dati.feedback = "Registrazione avvenuta con successo";


    }

    $scope.registraScadenza=function(azione, data){
        console.log("vediamo cosa c'è:" + azione + " "+ $rootScope.info.cartaSpec.$id+ " "+data+ " "+$scope.dati.deadline+ $rootScope.info.user.nome+ " "+$rootScope.info.cartaSpec.nome_specialita+ " "+$rootScope.info.user.codice+" "+$rootScope.info.cartaSpec.specialita)
        Scadenza.creaScadenza(azione, $rootScope.info.cartaSpec.$id, data, $scope.dati.deadline, $rootScope.info.user.nome, $rootScope.info.cartaSpec.nome, $rootScope.info.user.codice, $rootScope.info.cartaSpec.specialita)
        console.log("Salvataggio avvenuto con successo")
    }
}])