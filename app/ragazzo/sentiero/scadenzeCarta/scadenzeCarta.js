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

app.controller('myAppScadenzeCartaCtrl', function($scope){

})