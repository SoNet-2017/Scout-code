'use strict';

var app=angular.module('myAppListaSpecialita',[
    'ngMaterial',
    'ngRoute'
]);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/listaSpecialita', {
        templateUrl: 'ragazzo/sentiero/listaSpecialita/listaSpecialita.html',
        controller: 'myAppListaSpecialitaCtrl'
    })
}]);

app.controller('myAppListaSpecialitaCtrl',['$scope', '$rootScope', 'Specialita', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$firebaseStorage', '$location',
    function($scope,$rootScope, Specialita, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog, $firebaseStorage, $location){
    $scope.dati={};
    $scope.dati.specialita=Specialita.getData();
    $scope.dati.utente=Utente.getData();
    $scope.dati.carte_specialita=CartaSpecialita.getData();
    $scope.status = '  ';
    $scope.customFullscreen = false



    $scope.showAlert = function (ev,nome) {
        for(var i=0;i<$scope.dati.specialita.length;i++) {
            if ($scope.dati.specialita[i].nome == nome) {
                var descrizione = $scope.dati.specialita[i].descrizione;
                var nomeSpec=$scope.dati.specialita[i].nome;
                var spec=$scope.dati.specialita[i];

            }
        }

        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(nomeSpec)
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ho Capito!')
                .targetEvent(ev)
        );
    };

    $scope.scegliSpecialita = function(nomeSpecialita) {
        $location.path("/sceltaMaestro/" + nomeSpecialita);
    };

}]);

