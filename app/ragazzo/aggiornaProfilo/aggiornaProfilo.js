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

app.controller('aggiornaProfiloRagazzoCtrl', ['$scope', '$rootScope', 'Utente', '$firebaseAuth', '$location', '$routeParams', function($scope, $rootScope, Utente,$firebaseAuth, $location, $routeParams) {
    $scope.dati={}



    /*---CREAZIONE DELL'UPLOAD DELL'IMMAGINE DEL PROFILO---*/
    $scope.fileToUpload = null;
    if ($scope.fileToUpload != null) {
        //get the name of the file
        var fileName = $scope.fileToUpload.name;
        //specify the path in which the file should be saved on firebase
        var storageRef = firebase.storage().ref("profiloImg/" + fileName);
        $scope.storage = $firebaseStorage(storageRef);
        var uploadTask = $scope.storage.$put($scope.fileToUpload);
        uploadTask.$complete(function (snapshot) {
            $scope.imgPath = snapshot.downloadURL;

            //--BISOGNA CAMBIARE IL METODO E CAPIRE COME INSERIRE L'AGGIORNA PITTOSTO CHE IL CREA! --
            $scope.finalPizzaAddition();
        });
    }

}])

