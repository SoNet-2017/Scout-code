'use strict';

var app = angular.module('myAppProfiloCapo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profiloCapo', {
        templateUrl: 'capo/profiloCapo/profiloCapo.html',
        controller: 'profiloCapoCtrl',
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




app.controller('profiloCapoCtrl', ['$scope', '$rootScope', 'Utente', 'currentAuth', '$firebaseAuth', '$location', function($scope, $rootScope, Utente, currentAuth, $firebaseAuth, $location) {

    //console.log("Contenuto di $rootScope.dati.user.nome : " + $rootScope.dati.user.nome);

    /* NON SERVE PIU'
    $scope.dati={};

    console.log("Questo e' l'id del loggato nel profilo capo: " + currentAuth.uid);
    $scope.dati.user = Utente.getUserInfo(currentAuth.uid);
    */


    // function called when the "logout" button will be pressed
    $scope.logout = function () {

        //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
        Utente.registerLogout(currentAuth.uid);
        //sign out
        $firebaseAuth().$signOut();
        console.log("logout avvenuto");
        $rootScope.info={};
        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                console.log("L'utente che che si è riloggato e': ", firebaseUser.uid);
            } else {
                $location.path("/login");
            }
        });
    };
}]);