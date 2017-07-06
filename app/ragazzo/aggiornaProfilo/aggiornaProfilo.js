'use strict';

var app = angular.module('myAppAggiornaProfiloRagazzo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/aggiornaProfiloRagazzo/:codiceRagazzo', {
        templateUrl: 'ragazzo/aggiornaProfilo/aggiornaProfilo.html',
        controller: 'aggiornaProfiloRagazzoCtrl',
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

app.controller('aggiornaProfiloRagazzoCtrl', ['$scope', '$rootScope', 'Bio', 'RegistrazioneBioService', 'Utente', '$firebaseAuth', '$location', '$routeParams', function($scope, $rootScope, Bio, RegistrazioneBioService, Utente,$firebaseAuth, $location, $routeParams) {
    $scope.dati={}
    $scope.dati.bio=Bio.getData();
    $scope.dati.utente=$routeParams.codiceRagazzo;
    $scope.dati.bio.foto_url="";
    $scope.dati.bio.impegni="";

    $scope.salvaBio=function(){

        console.log("ho premuto su salva");
        for(var i = 0; i<$scope.dati.bio.length; i++){
            if($scope.dati.bio[i].codice!=$scope.dati.utente){
                console.log("sto salvando un nuovo bio")
                RegistrazioneBioService.aggiungiBio($scope.dati.utente, $scope.dati.bio.descrizione, $scope.dati.bio.foto_url, $scope.dati.bio.hobby, $scope.dati.bio.impegni);

            }
            else{
                console.log("sto aggiornando...")
                if( $scope.dati.bio.descrizione!=""){
                    console.log("sto aggiornando la descrizione")
                    Bio.aggiornaBioDescrizione($scope.dati.bio[i].$id,$scope.dati.bio.descrizione)
                }
                else if($scope.dati.bio.hobby!=""){
                    console.log("sto aggiornando gli hobby")
                    Bio.aggiornaBioHobby($scope.dati.bio[i].$id,$scope.dati.bio.hobby)
                }
            }
        }

        $location.path("/profiloRagazzo/");

    }

}])

