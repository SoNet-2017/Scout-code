'use strict';

var app=angular.module('myAppListaSpecialita',[
    'ngMaterial',
    'ngRoute'
]);
app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/listaSpecialita', {
        templateUrl: 'ragazzo/sentiero/listaSpecialita/listaSpecialita.html',
        controller: 'myAppListaSpecialitaCtrl'
    })
}]);

app.controller('myAppListaSpecialitaCtrl',['$scope','$rootScope', 'Specialita', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$firebaseStorage', '$location', function($scope,$rootScope,Specialita, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog, $firebaseStorage, $location){
    $scope.dati={};
    $scope.dati.specialita=Specialita.getData();
    $scope.dati.utente=Utente.getData();
    $scope.dati.carte_specialita=CartaSpecialita.getData();
    $scope.status = '  ';
    $scope.customFullscreen = false



    $scope.showAlert = function (ev,nome) {
        console.log('clicco')
        for(var i=0;i<$scope.dati.specialita.length;i++) {
            console.log('clicco 1')
            console.log(nome)
            if ($scope.dati.specialita[i].nome == nome) {
                console.log('siamo dentro if');
                var descrizione = $scope.dati.specialita[i].descrizione;
                var nomeSpec=$scope.dati.specialita[i].nome;
                var spec=$scope.dati.specialita[i];
            }
        }

        console.log(descrizione)
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(nomeSpec)
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.scegliSpecialita = function(nomeSpecialita) {
        $location.path("/sceltaMaestro/" + nomeSpecialita);
    };

}]);

