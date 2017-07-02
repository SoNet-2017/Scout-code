'use strict';

var app = angular.module('myAppAssegnaTappa', [
    'ngMaterial',
    'ngRoute',
    'myAppSquadriglia'
]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/assegnaTappa',{
        templateUrl: 'capo/assegnaTappa/assegnaTappa.html',
        controller: 'myAppAssegnaTappaCtrl',
        resolve: {
            "currentAuth":["Auth",function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);




app.controller('myAppAssegnaTappaCtrl', ['$scope','$rootScope', 'Mete', 'Impegni', 'Utente', function($scope,$rootScope, Mete, Impegni, Utente) {
        console.log("e' entrato nel ctrl assegna tappa");


    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";

    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {

                var uuid = $scope.dati.utenti[i].$id;
                var tappaOld =  $scope.dati.utenti[i].tappa;
                console.log("All'inizio " + $scope.dati.utenti[i].nome + " ha la tappa " + tappaOld);
            }
        }
    });

    $scope.dati.mete=Mete.getData()
    $scope.dati.impegni=Impegni.getData()
    $scope.salvaTappe = function(params) {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            console.log("ENTRO NEL salva tappe");

            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {
                var uuid = $scope.dati.utenti[i].$id;
                var newTappa = $scope.dati.utenti[i].tappa;
                console.log("Alla fine " + $scope.dati.utenti[i].nome + " ha la tappa " + newTappa);
                Utente.aggiornaTappa(uuid, newTappa);
                for(var j = 0; j<$scope.dati.mete.length;j++) {
                    for( var z = 0; z<$scope.dati.impegni.length;z++) {
                        var oldTappa = $scope.dati.utenti[i].tappa;
                        if($scope.dati.utenti[i].codice==$scope.dati.mete[j].codice && $scope.dati.utenti[i].codice==$scope.dati.impegni[z].codice) {
                            if (($scope.dati.mete[j].tappa == "" && $scope.dati.impegni[z].tappa == "") || oldTappa=="Responsabilità" || oldTappa=="Scoperta" || oldTappa=="Competenza") {
                                console.log("entriamo qui dentro")
                                Mete.aggiornaMetaTappa($scope.dati.mete[j].$id, newTappa)
                                Impegni.aggiornaImpegniTappa($scope.dati.impegni[z].$id, newTappa)

                            }
                        }
                    }
                }

            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";
    };

}]);

