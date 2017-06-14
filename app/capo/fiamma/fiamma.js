'use strict';

var app = angular.module('myAppFiamma', [
    'ngMaterial',
    'ngRoute'
]);

app.controller('myAppFiammaCtrl', function($scope) {

});

/*
app.controller('myAppFiammaCtrl', ['$scope','$rootScope', 'Squadriglia', function($scope,$rootScope, Squadriglia) {
    //initialize variables
    $scope.dati={};
    $scope.dati.vm = this;
    $scope.dati.vm.positions = [];
    //set the variable that is used in the main template to show the active button
    $rootScope.dati.currentView = "home";
    //get the list of available pizzas
    $scope.dati.squadriglie = Squadriglia.getData();
}]);
*/

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/fiamma',{
        templateUrl: 'capo/fiamma/fiamma.html',
        controller: 'myAppFiammaCtrl',
        /* IN ATTESA DEL LOGIN
        resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }
         */
    })
}]);