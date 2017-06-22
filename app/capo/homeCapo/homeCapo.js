'use strict';

var app=angular.module('myAppHomeCapo', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento',
    'myAppAuthentication'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/homeCapo',{
        templateUrl: 'capo/homeCapo/homeCapo.html',
        controller: 'myAppHomeCapoCtrl',
        resolve: {
            "currentAuth":["Auth",function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppHomeCapoCtrl', ['$scope','$rootScope', 'Evento', '$firebaseAuth', function($scope,$rootScope, Evento, $firebaseAuth) {


    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";
    //get the list of available sq
    $scope.dati.eventi = Evento.getData();
    $scope.dati.eventi.$loaded().then(function () {

    });


    $scope.isLogged = function()
    {
        if ($firebaseAuth().$getAuth())
            return true;
        else
            return false;
    }

}]);
