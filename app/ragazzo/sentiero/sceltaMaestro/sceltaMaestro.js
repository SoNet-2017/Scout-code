'use strict';

var app=angular.module('myAppSceltaMaestro',[
    'ngRoute',
    'ngMaterial'
]);

app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/sceltaMaestro', {
        templateUrl: 'ragazzo/sentiero/sceltaMaestro/sceltaMaestro.html',
        controller: 'myAppSceltaMaestroCtrl'
    })
}]);

app.controller('myAppSceltaMaestroCtrl',['$scope','$rootScope', 'Specialita', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', function($scope, $rootScope, Specialita, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog){
    $scope.dati={};
    $scope.dati.utente=Utente.getData();
    $scope.dati.specialita=Specialita.getData();
    $scope.dati.carte_specialita=CartaSpecialita.getData();
    $scope.status = '  ';
    $scope.customFullscreen = false
}])