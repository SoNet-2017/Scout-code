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

app.controller('aggiornaProfiloRagazzoCtrl', ['$scope', '$rootScope', 'Bio', 'RegistrazioneBioService', 'Utente', '$firebaseAuth', '$location', '$routeParams', '$firebaseStorage', function($scope, $rootScope, Bio, RegistrazioneBioService, Utente,$firebaseAuth, $location, $routeParams,$firebaseStorage) {
    $scope.dati={}
    $scope.dati.bio=Bio.getData();
    $scope.dati.utente=$routeParams.codiceRagazzo;
    $scope.dati.vuoto="";
    $scope.dati.bio.impegni="";
    var ctrl = this;
    $scope.fileToUpload=null;
    $scope.imgPath="";
    $scope.dati.utenteCorrente=$rootScope.info.user;
    console.log(""+$scope.dati.utenteCorrente.codice)


    $scope.salvaBio=function(){

        console.log("ho premuto su salva");
        for(var i = 0; i<$scope.dati.bio.length; i++){
            if($scope.dati.bio[i].codice!=$scope.dati.utente){
                console.log("sto salvando un nuovo bio")
                RegistrazioneBioService.aggiungiBio($scope.dati.utente, $scope.dati.bio.descrizione, $scope.dati.vuoto, $scope.dati.bio.hobby, $scope.dati.bio.impegni);

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
    $scope.fotoProfilo= function() {
        if ($scope.fileToUpload != null) {
            var fileName = $scope.fileToUpload.name;
            var storageRef = firebase.storage().ref("fotoProfilo/" + fileName);
            console.log("Sono dentro l'immissione di una foto")
            $scope.storage = $firebaseStorage(storageRef);
            var uploadTask = $scope.storage.$put($scope.fileToUpload);
            uploadTask.$complete(function (snapshot) {
                $scope.imgPath = snapshot.downloadURL;
                $scope.immettiFoto();
            });
        }
    }

    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
        console.log($scope.fileToUpload.name);
            }
    $scope.immettiFoto=function(){
        for(var i = 0; i<$scope.dati.bio.length; i++) {
            if ($scope.dati.bio[i].codice == $scope.dati.utente) {
                console.log("sono dentro al for di immettiFoto")
                console.log("richiamo la funzione che agiorna il path" + $scope.dati.bio[i].$id)
                Bio.aggiornaBioFoto($scope.dati.bio[i].$id, $scope.imgPath)
            }
        }
        $location.path("/profiloRagazzo/");

    }

}])

