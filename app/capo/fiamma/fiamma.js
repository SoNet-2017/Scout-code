'use strict';

var app = angular.module('myAppFiamma', [
    'ngMaterial',
    'ngRoute',
    'myAppSquadriglia'
]);


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




app.controller('myAppFiammaCtrl', ['$scope','$rootScope', 'Squadriglia', function($scope,$rootScope, Squadriglia) {
    console.log("e' entrato nel ctrl fiamma database");

    //initialize variables
    $scope.dati={};

    //NON CI SERVE
    // $rootScope.dati.currentView = "home";

    //get the list of available pizzas
    $scope.dati.squadriglie = Squadriglia.getData();

    //METTI NELLA VARIABILE LA SQ CHE DETIENE LA FIAMMA
    $scope.dati.squadriglie.$loaded().then(function () {


        for (var i = 0; i < $scope.dati.squadriglie.length; i++) {
            if ($scope.dati.squadriglie[i].fiamma == 'true') {
                var oldFiamma = $scope.dati.squadriglie[i].nome;

                $scope.data = {
                    oldFiamma : oldFiamma,
                    newFiamma : oldFiamma
                };
            }
        }
    });

    $scope.salvaFiamma = function(newFiamma, oldFiamma) {
        console.log("hai premuto su salva");
        console.log("Vecchia fiamma:"+ $scope.data.oldFiamma);
        console.log("Nuova fiamma:"+ $scope.data.newFiamma);


    };
}]);

