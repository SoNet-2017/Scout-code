var app=angular.module('myAppSpecialitaAlert',[
    'ngMaterial',
    'ngRoute'
]);

app.controller('myAppSpecialitaAlertCtrl', ['$scope','$rootScope', 'Specialita', function($scope,$rootScope, Specialita) {
    console.log("e' entrato nel ctrl specialita database");

    $scope.dati={};
    $scope.dati.squadriglie = Specialita.getData();


}]);