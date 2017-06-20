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
        $mdDialog.show({
            templateUrl:'ragazzo/sentiero/listaSpecialita/specialita/specialita-alert.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
}]);

