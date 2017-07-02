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

}])

