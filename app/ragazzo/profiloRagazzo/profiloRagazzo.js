'use strict';

var app = angular.module('myAppProfiloRagazzo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente',
    'myAppDistintivi',
    'myAppSquadriglia'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profiloRagazzo/:codiceRagazzo', {
        templateUrl: 'ragazzo/profiloRagazzo/profiloRagazzo.html',
        controller: 'profiloRagazzoCtrl',
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




app.controller('profiloRagazzoCtrl', ['$scope', '$rootScope', 'Utente', 'currentAuth', '$firebaseAuth', '$location', '$routeParams', 'Distintivo', 'Squadriglia',
                function($scope, $rootScope, Utente, currentAuth, $firebaseAuth, $location, $routeParams, Distintivo, Squadriglia) {



    //CARICO IL PROFILO CON I DATI DELL'UTENTE SELEZIONATO
    $scope.dati = {};
    var uuidProfilo = "";

    console.log("questo e' il route params che ricevo dal riderect: " + $routeParams.codiceRagazzo);
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if($scope.dati.utenti[i].codice == $routeParams.codiceRagazzo){
                $scope.dati.user = Utente.getUserInfo($scope.dati.utenti[i].$id);
            }
        }
    });


    $scope.dati.distintivi = Distintivo.getData();
     $scope.dati.squadriglie = Squadriglia.getData();




    // function called when the "logout" button will be pressed
    $scope.logout = function () {

        //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
        Utente.registerLogout(currentAuth.uid);
        //sign out
        $firebaseAuth().$signOut();
        console.log("logout avvenuto");

        $rootScope.info.info = false;
        console.log("Nel Logout setto info a false, e vale: " +  $rootScope.info.info);

        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                console.log("L'utente e' già loggato con l'id:  ", firebaseUser.uid);
            } else {
                $location.path("/login");
            }
        });
    };
}]);