'use strict';

var app=angular.module('myAppElencoSpecCorrelate',[
    'ngRoute',
    'ngMaterial'
]);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/elencoSpecCorrelate/:cartaCompetenzaId', {
        templateUrl: 'ragazzo/sentiero/elencoSpecCorrelate/elencoSpecCorrelate.html',
        controller: 'myAppElencoSpecCorrelateCtrl'
    })
}]);

app.controller('myAppElencoSpecCorrelateCtrl',['$scope','$rootScope', '$routeParams', 'Specialita', 'Brevetti', 'Utente', 'CartaCompetenza', '$mdDialog', '$location',
    function($scope, $rootScope, $routeParams, Specialita, Brevetti, Utente, CartaCompetenza, $mdDialog, $location){
    $scope.dati={}
    $scope.dati.elencoSpec={}
    $scope.dati.cartaCompetenza=CartaCompetenza.getData();
    $scope.dati.brevetti=Brevetti.getData();
    $scope.dati.brevetti.$loaded().then(function () {
        for(var i = 0; i<$scope.dati.brevetti.length; i++){
            console.log("siamo nel primo for")
            for( var j = 0; j<$scope.dati.cartaCompetenza.length; j++) {
                console.log("siamo nel secondo for")
                if ($scope.dati.brevetti[i].nome == $scope.dati.cartaCompetenza[j].nome) {
                    console.log("siamo nel primo if")
                    if($scope.dati.cartaCompetenza[j].$id==$routeParams.cartaCompetenzaId) {
                        $scope.dati.elencoSpec = Brevetti.getBrevettiInfo($scope.dati.brevetti[i].$id)
                    }
                }
            }
        }
    });

        $scope.dati.specialitaCollegate={}
        $scope.dati.specialita=Specialita.getData();
        $scope.myFunction=function () {
            var string=$scope.dati.elencoSpec.spec_collegate;
            var specialita = string.value;
            var array=string.split(", ");
            for(var i=0; i<$scope.dati.specialita.length;i++) {
                for (var j = 0; j< array.length; j++) {
                    if ($scope.dati.specialita[i].nome == array[j]) {
                        console.log(""+array[j]+$scope.dati.specialita[i].nome)
                        $scope.dati.specialitaCollegate=$scope.dati.specialita[i];
                        console.log(""+ $scope.dati.specialitaCollegate.img_url)
                    }
                }
            }


        }



    }])