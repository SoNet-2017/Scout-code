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


    $scope.showAlert = function (ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Descrizione')
                .textContent(descrizione)
                .ariaLabel('Alert Dialog Demo')
                .ok('Scegli!')
                .targetEvent(ev)
        );
    };
}]);

