'use strict';

var app = angular.module('myAppFormaSquadriglie', [
    'ngMaterial',
    'ngRoute',
    'myAppSquadriglia'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/formaSquadriglie',{
        templateUrl: 'capo/formaSquadriglie/formaSquadriglie.html',
        controller: 'myAppFormaSquadriglieCtrl',
        /* IN ATTESA DEL LOGIN
         resolve: {
         "currentAuth":["Auth",function(auth) {
         return Auth.$requireSignIn();
         }]
         }
         */
    })
}]);




app.controller('myAppFormaSquadriglieCtrl', ['$scope','$rootScope', 'Squadriglia', function($scope,$rootScope, Squadriglia) {
    console.log("e' entrato nel ctrl forma sq ");


    //initialize variables
    $scope.dati={};
    //get the list of available sq
    $scope.dati.squadriglie = Squadriglia.getData();
    $scope.dati.squadriglie.$loaded().then(function () {


        for (var i = 0; i < $scope.dati.squadriglie.length; i++) {
            if ($scope.dati.squadriglie[i].fiamma == true) {
                var oldFiamma = $scope.dati.squadriglie[i].nome;

                var uuidOld = $scope.dati.squadriglie[i].$id;
                console.log("nel for questo e' lo uuid di " +$scope.dati.squadriglie[i].nome +": "+ uuidOld);

                $scope.data = {
                    oldFiamma : oldFiamma,
                    newFiamma : oldFiamma,
                    uuidOld : uuidOld,
                };
            }
        }
    });





    $scope.salvaFiamma = function(newFiamma, oldFiamma) {
        var oldFiamma = $scope.data.oldFiamma;
        var newFiamma = $scope.data.newFiamma;
        var uuidOld = $scope.data.uuidOld;

        console.log("hai premuto su salva");
        console.log("Vecchia fiamma:"+ oldFiamma);
        console.log("Nuova fiamma:"+ newFiamma);

        for (var i = 0; i < $scope.dati.squadriglie.length; i++) {
        console.log("ENTRO NEL SECONDO FOR");
            if ($scope.dati.squadriglie[i].nome == newFiamma) {
                console.log("ENTRO NEL SECONDO IF");
                var uuidNew = $scope.dati.squadriglie[i].$id;
                console.log("nel secondo for questo e' il nuovo uuid: "+ uuidNew);

                $scope.data = {
                    uuidOld : uuidOld,
                    uuidNew : uuidNew,
                };
            }
        }


        Fiamma.aggiornaFiamma($scope.data.uuidOld, $scope.data.uuidNew);



        //NON HA SENSO RISCRIVERE TUTTO, ANDREBBE MESSO IN UNA FUNCTION


        //initialize variables
        $scope.dati={};
        //get the list of available sq
        $scope.dati.squadriglie = Squadriglia.getData();
        $scope.dati.squadriglie.$loaded().then(function () {


            for (var i = 0; i < $scope.dati.squadriglie.length; i++) {
                if ($scope.dati.squadriglie[i].fiamma == true) {
                    var oldFiamma = $scope.dati.squadriglie[i].nome;

                    var uuidOld = $scope.dati.squadriglie[i].$id;
                    console.log("nel for questo e' lo uuid di " +$scope.dati.squadriglie[i].nome +": "+ uuidOld);

                    $scope.data = {
                        oldFiamma : oldFiamma,
                        newFiamma : oldFiamma,
                        uuidOld : uuidOld,
                    };
                }
            }
        });


    };




}]);

