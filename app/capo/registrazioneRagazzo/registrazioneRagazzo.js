'use strict';

var app = angular.module('myAppRegistrazioneRagazzo', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'myAppUtente'
])

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrazioneRagazzo', {
            templateUrl: 'capo/registrazioneRagazzo/registrazioneRagazzo.html',
            controller: 'RegistrazioneRagazzoCtrl'
        });
    }]);

app.controller('RegistrazioneRagazzoCtrl', ['$scope', 'RegistrazioneRagazzoService', '$firebaseStorage',
        function($scope, $rootScope, RegistrazioneRagazzoService, $firebaseStorage) {



            //initialize variables
            $scope.dati = {};
            $scope.dati.feedback = "";

            //define the function that will actually create a new record in the database
            $scope.registrazioneRagazzo = function() {

                console.log("ho premuto su REGISTRA");
                $scope.dati.feedback = "feedback:hai premuto su registra";

                $scope.aggiuntaRagazzoFinale();


                //check if the user inserted all the required information
                if ($scope.dati.codice!= undefined && $scope.dati.codice!="" && $scope.dati.nome!= undefined && $scope.dati.nome!="" && $scope.dati.cognome!=undefined && $scope.dati.cognome!="") {


                    console.log("entra nell'if che controlla se dati inseriti");

                    $scope.dati.error = "";

                    $scope.aggiuntaRagazzoFinale();


                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Hai dimenticato di inserire una informazione obbligatoria!";
                }
            };



            //function that will create the new record (with the boy) in the Firebase storage
            $scope.aggiuntaRagazzoFinale = function()
            {
                RegistrazioneRagazzoService.aggiungiRagazzo($scope.dati.codice, $scope.dati.nome, $scope.dati.cognome).then(function(ref) {

                    console.log("entra nell'aggiungi ragazzo");

                    var ragazzoId = ref.key;
                    RegistrazioneRagazzoService.aggiornaUtente(ragazzoId);
                    $scope.dati.feedback = "Il ragazzo è stato aggiunto con successo";
                    $scope.dati.codice = "";
                    $scope.dati.nome = "";
                    $scope.dati.cognome = "";
                });
            }
        }]);