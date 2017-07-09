'use strict';

var app=angular.module('myAppSceltaMaestroBrev',[
    'ngRoute',
    'ngMaterial'
]);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/sceltaMaestroBrev/:nomeBrevetto', {
        templateUrl: 'ragazzo/sentiero/sceltaMaestroBrev/sceltaMaestroBrev.html',
        controller: 'myAppSceltaMaestroBrevCtrl'
    })
}]);

app.controller('myAppSceltaMaestroBrevCtrl',['$scope','$rootScope', '$routeParams', 'Brevetti', 'Utente', 'CartaCompetenza', '$mdDialog', '$location',
    function($scope, $rootScope, $routeParams, Brevetti, Utente, CartaCompetenza, $mdDialog, $location){
        $scope.dati={};
        $scope.dati.utenti=Utente.getData();
        $scope.dati.brevetto=Brevetti.getData();
        $scope.dati.carte_competenza=CartaCompetenza.getData();
        $scope.status = '';
        $scope.customFullscreen = false
        $scope.dati.nomeBrev=$routeParams.nomeBrevetto

        $scope.dati.maestro="";

        $scope.salvaCartaCompetenza = function() {

            $scope.dati.feedback = "";
            $scope.dati.error = "";

            console.log("ho premuto su REGISTRA");

            //check if the user inserted all the required information
            if ($scope.dati.maestro != undefined && $scope.dati.maestro != "" && $scope.dati.motivazione != undefined && $scope.dati.motivazione != "") {
                for(var i = 0; i<$scope.dati.brevetto.length; i++){
                    if($scope.dati.brevetto[i].nome==$routeParams.nomeBrevetto){
                        $scope.dati.url=$scope.dati.brevetto[i].img_url;
                        $scope.dati.id=$scope.dati.brevetto[i].$id;
                    }
                }
                $scope.registraCartaCompetenza();
            }
            else {
                //write an error message to the user
                $scope.dati.error = "Hai dimenticato di inserire una informazione obbligatoria!";
            }

        };

        $scope.dati.vuoto="";
        //function that will create the new record (with the boy) in the Firebase storage
        $scope.registraCartaCompetenza = function()
        {
            console.log("entra in registra");


            CartaCompetenza.aggiungiCarta($scope.dati.vuoto, $scope.dati.url, $scope.dati.maestro, $scope.dati.motivazione, $routeParams.nomeBrevetto, $rootScope.info.user.codice, $scope.dati.id).then(function(ref) {

                console.log("uscito dal factory aggiungi carta");

                var cartaCompetenzaId = ref.key
                console.log("Questo è il uuid delal carta: "+ cartaCompetenzaId);

                $rootScope.info.cartaCompetenza={};

                $rootScope.info.cartaCompetenza=CartaCompetenza.getCartaInfo(cartaCompetenzaId);



                $scope.dati.feedback = "Registrazione avvenuta con successo";
                $location.path("/elencoSpecCorrelate/" + cartaCompetenzaId);

            });


        }


    }])