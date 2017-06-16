'use strict';

var app = angular.module('myAppStaff', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/staff',{
        templateUrl: 'capo/staff/staff.html',
        controller: 'myAppStaffCtrl',
        /* IN ATTESA DEL LOGIN
         resolve: {
         "currentAuth":["Auth",function(auth) {
         return Auth.$requireSignIn();
         }]
         }
         */
    })
}]);




app.controller('myAppStaffCtrl', ['$scope','$rootScope', 'Utente', function($scope,$rootScope, Utente) {
    console.log("e' entrato nel ctrl staff");


    //initialize variables
    $scope.dati={};
    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {

        /**

        for (var i = 0; i < $scope.dati.utenti.length; i++) {
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

         **/
    });






}]);

