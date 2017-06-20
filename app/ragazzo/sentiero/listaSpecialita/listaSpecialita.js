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

app.controller('myAppListaSpecialitaCtrl',['$scope','$rootScope', 'Specialita', '$mdDialog', function($scope,$rootScope,Specialita,$mdDialog){
    $scope.dati={};
    $scope.dati.specialita=Specialita.getData();
    $scope.status = '  ';
    $scope.customFullscreen = false;


    $scope.showAlert = function (ev,nome) {
        console.log('clicco')
        for(var i=0;i<$scope.dati.specialita.length;i++) {
            console.log('clicco 1')
            console.log(nome)
            if ($scope.dati.specialita[i].nome == nome) {
                console.log('siamo dentro if');
                var descrizione = $scope.dati.specialita[i].descrizione;
            }
        }
        console.log(descrizione)
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };
}]);

