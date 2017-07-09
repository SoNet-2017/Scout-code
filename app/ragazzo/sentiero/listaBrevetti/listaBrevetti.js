'use strict';

var app=angular.module('myAppListaBrevetti',[
    'ngMaterial',
    'ngRoute'
]);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/listaBrevetti', {
        templateUrl: 'ragazzo/sentiero/listaBrevetti/listaBrevetti.html',
        controller: 'myAppListaBrevettiCtrl'
    })
}]);

app.controller('myAppListaBrevettiCtrl',['$scope', '$rootScope', 'Specialita', 'Utente', 'Brevetti', '$mdDialog', '$firebaseStorage', '$location',
    function($scope, $rootScope, Specialita, Utente, Brevetti, $mdDialog, $firebaseStorage, $location){

    $scope.dati={};
    $scope.dati.brevetti=Brevetti.getData();

    $scope.showAlert = function (ev,nome) {
        console.log('clicco')
        for(var i=0;i<$scope.dati.brevetti.length;i++) {
            console.log('clicco 1')
            console.log(nome)
            if ($scope.dati.brevetti[i].nome == nome) {
                console.log('siamo dentro if');
                var descrizione = $scope.dati.brevetti[i].descrizione;
                var nomeBrevetti=$scope.dati.brevetti[i].nome;
                var brev=$scope.dati.brevetti[i];
            }
        }

        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(nomeBrevetti)
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ho Capito!')
                .targetEvent(ev)
            );
        };

        $scope.scegliBrevetto= function(nomeBrevetto) {
            $location.path("/sceltaMaestroBrev/" + nomeBrevetto);
        };

    $scope.showDiv=function(){
        var x = document.getElementById('myDiv');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }


}])
