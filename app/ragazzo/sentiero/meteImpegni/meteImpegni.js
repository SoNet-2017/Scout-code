'use strict';

var app = angular.module('myAppMeteImpegni', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente',
    'myAppMete',
    'myAppImpegni'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/meteImpegni/:codiceRagazzo', {
        templateUrl: 'ragazzo/sentiero/meteImpegni/meteImpegni.html',
        controller: 'myAppMeteImpegniCtr',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $routeChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    })
}])

app.controller('myAppMeteImpegniCtr', ['$scope', '$rootScope', 'Utente', 'Mete', 'Impegni', 'currentAuth', '$firebaseAuth', '$location', '$routeParams',
    function($scope, $rootScope, Utente,  Mete, Impegni, currentAuth, $firebaseAuth, $location, $routeParams) {

    $scope.dati={}
    $scope.dati.mete=Mete.getData();
    $scope.dati.impegni=Impegni.getData();

    $scope.dati.utente=$routeParams.codiceRagazzo;

    $scope.dati.utenti=Utente.getData()
    $scope.dati.utenti.$loaded().then(function () {
        for(var i = 0; i<$scope.dati.utenti.length; i++){
            console.log("sono dentro al for per la tappa");
            if($scope.dati.utenti[i].codice==$routeParams.codiceRagazzo){
                console.log("ALEEEEEEE EEEEE EEEE ");
                $scope.dati.tappa=Utente.getData($scope.dati.utenti[i].tappa)
            }
        }

    })

    $scope.salvaMeteImpegni=function(){

            $scope.dati.feedback = "";
            $scope.dati.error = "";

            console.log("ho premuto su salva");


            for(var i = 0; i<$scope.dati.mete.length;i++) {

                console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 1")
                for(var j = 0; j<$scope.dati.impegni.length;j++) {
                    console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 2 ")
                    if ($scope.dati.mete[i].codice == $scope.dati.utente) {
                        console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 3 ")

                        if ($scope.dati.impegni[j].codice == $scope.dati.utente) {
                            console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 4 ")


                            if ($scope.dati.mete == undefined || $scope.dati.mete == "" || $scope.dati.impegni == undefined || $scope.dati.impegni == "") {
                                Mete.aggiungiMete($scope.dati.mete.azione, $scope.dati.utente, $scope.dati.utente.tappa)
                                Impegni.aggiungiImpegni($scope.dati.impegni.azione, $scope.dati.utente, $scope.dati.utente.tappa)
                            }
                            else if ($scope.dati.mete != undefined && $scope.dati.mete != "" && $scope.dati.impegni != undefined && $scope.dati.impegni != "") {
                                Mete.aggiornaMeta($scope.dati.mete[i].$id, $scope.dati.mete.azione)
                                Impegni.aggiornaImpegni($scope.dati.impegni[j].$id, $scope.dati.impegni.azione)
                            }
                        }
                    }
                }
            }

        $location.path("/sentiero/");
        $scope.dati.feedback = "Registrazione avvenuta con successo";

        }





    }])

