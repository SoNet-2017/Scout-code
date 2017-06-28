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


app.controller('myAppSentieroCtrl', ['$scope','$rootScope', 'Scadenza', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$firebaseStorage', '$location', function($scope,$rootScope, Scadenza, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog, $firebaseStorage, $location){
    $scope.dati={}
    $scope.dati.utente=$rootScope.info.user
    $scope.dati.cartaSpec=CartaSpecialita.getData()
    $scope.dati.scadenze=Scadenza.getData()
    $scope.dati.utente=Utente.getData()
    $scope.dati.cartaSpec.$loaded().then(function(){
        for(var i = 0; i<$scope.dati.cartaSpec.length; i++){
            console.log("entro nel for 1")
            for(var j = 0; j<$scope.dati.scadenze.length; j++){
                console.log("entro nel for 2")
                for(var z =0; z<$scope.dati.utente.length; z++) {
                    if ($scope.dati.scadenze[j].conferma == false && $scope.dati.utente[z].codice == $rootScope.info.user.codice && $scope.dati.scadenze[j].carta_spec == $scope.dati.cartaSpec[i].$id) {
                        console.log("entro nellif")
                        $scope.dati.visualizzaCarta = CartaSpecialita.getCartaInfo($scope.dati.cartaSpec[i].$id);
                        console.log("" + $scope.dati.visualizzaCarta.img_url)

                    }
                }
            }

        }
        /*console.log(""+$scope.dati.visualizzaCarta.img_url)*/
    })

}]);