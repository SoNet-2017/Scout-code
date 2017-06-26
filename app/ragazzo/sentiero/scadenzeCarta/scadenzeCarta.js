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

app.controller('myAppScadenzeCartaCtrl', ['$scope','$rootScope', '$routeParams', 'Scadenza', '$location', function($scope, $rootScope, $routeParams, Scadenza, $location){
    $scope.dati={};
    $scope.dati.cartaSpec=$routeParams.cartaSpecialitaId
    $scope.status = '  ';
    $scope.customFullscreen = false
    $scope.dati.myDate1=new Date()
    $scope.dati.myDate2=new Date()
    $scope.dati.myDate3=new Date()
    $scope.dati.myDate4=new Date()
    $scope.dati.nomeRagazzo=$rootScope.info.user.nome



    $scope.salvaScadenze=function(){

        $scope.dati.feedback = "";
        $scope.dati.error = "";

        console.log("ho premuto su salva");

        if($scope.dati.azione1 != undefined && $scope.dati.maestro != ""&& $scope.dati.myDate1 != undefined && $$scope.dati.myDate1!=""){
            $scope.registraScadenza1();
        }
    }


    $scope.registraScadenza1=function(){
        Scadenza.creaScadenze()
    }
}])