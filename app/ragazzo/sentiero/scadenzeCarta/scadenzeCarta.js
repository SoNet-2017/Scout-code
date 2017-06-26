'use strict';

var app=angular.module('myAppeScadenzeCarta', [
    'ngMaterial',
    'ngRoute'

])

app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/scadenzeCarta/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/sceltaMaestro/sceltaMaestro.html',
        controller: 'myAppSceltaMaestroCtrl'
    })
}]);