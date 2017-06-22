var app=angular.module('myAppListaSpecialita',[
    'ngMaterial',
    'ngRoute'
]);
app.config(['$routeProvider',function($routeProvider) {
    console.log('siamo nel config');
    $routeProvider.when('/listaSpecialita', {
        templateUrl: 'ragazzo/sentiero/listaSpecialita/listaSpecialita.html',
        controller: 'myAppListaSpecialitaCtrl'
    })
}]);

app.controller('myAppListaSpecialitaCtrl',['$scope','$rootScope', 'Specialita', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', function($scope,$rootScope,Specialita, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog){
    $scope.dati={};
    $scope.dati.specialita=Specialita.getData();
    $scope.dati.utente=Utente.getData();
    $scope.dati.carte_specialita=CartaSpecialita.getData();
    $scope.status = '  ';
    $scope.customFullscreen = false


    $scope.showAlert = function (ev,nome) {
        console.log('clicco')
        for(var i=0;i<$scope.dati.specialita.length;i++) {
            console.log('clicco 1')
            console.log(nome)
            if ($scope.dati.specialita[i].nome == nome) {
                console.log('siamo dentro if');
                var descrizione = $scope.dati.specialita[i].descrizione;
                var nomeSpec=$scope.dati.specialita[i].nome;
            }
        }
        console.log(descrizione)
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(nomeSpec)
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.salvaCartaSpecialita=function(params){
        for (var i = 0; i < $scope.dati.utente.length; i++) {
            console.log('Stiamo salvando la carta di specialita')
            if($scope.dati.utente[i].nome == true){
                console.log('sono entrato nellif')
                for(var i = 0; i < $scope.dati.specialita.length; i++){
                    console.log('Attiva Specialita')
                }

            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";
    }



}]);

