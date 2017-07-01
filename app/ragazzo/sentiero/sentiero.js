var app=angular.module('myAppSentiero', [
    'ngMaterial',
    'ngRoute',
    'myAppListaSpecialita'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sentiero',{
        templateUrl: 'ragazzo/sentiero/sentiero.html',
        controller: 'myAppSentieroCtrl',
        /*resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }*/

    })
}]);


app.controller('myAppSentieroCtrl', ['$scope','$rootScope', 'Mete', 'Impegni', 'Scadenza', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$firebaseStorage', '$location', function($scope,$rootScope, Mete, Impegni, Scadenza, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog, $firebaseStorage, $location){
    $scope.dati={}
    $scope.dati.utente=$rootScope.info.user
    $scope.dati.cartaSpec=CartaSpecialita.getData()
    $scope.dati.scadenze=Scadenza.getData()
    $scope.dati.cartaSpec.$loaded().then(function() {
        for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
            for (var j = 0; j < $scope.dati.scadenze.length; j++) {
                if ($scope.dati.scadenze[j].carta_spec == $scope.dati.cartaSpec[i].$id) {
                    console.log("entro nel if scadenza appartiene a carta attuale")
                    if ($scope.dati.scadenze[j].conferma == false) {
                        console.log("trovo una scadenza non confermata")
                        $scope.dati.cartaSpec[i].attiva = true;
                        console.log("La carta " + $scope.dati.cartaSpec[i].$id + " è attiva");
                    }
                }
            }
        }
    })


    $scope.dati.utenti = Utente.getData()
        $scope.dati.mete = Mete.getData();
        $scope.dati.impegni = Impegni.getData();

        console.log("mostriamo gli impegni e le mete attuali")
        $scope.dati.mete.$loaded().then(function() {
            for (var i = 0; i < $scope.dati.mete.length; i++) {
                for (var j = 0; j < $scope.dati.impegni.length; j++) {
                    if ($scope.dati.mete[i].codice == $scope.dati.utente.codice) {
                        console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 3 ")
                        if ($scope.dati.impegni[j].codice == $scope.dati.utente.codice) {
                            console.log("vediamo se riesco a salvare o aggiornare le mete e gli impegni 4 ")
                            $scope.dati.metaAttuale = Mete.getMeteInfo($scope.dati.mete[i].$id)
                            $scope.dati.impegnoAttuale = Impegni.getImpegniInfo($scope.dati.impegni[j].$id)
                        }
                    }
                }
            }
        })






}]);