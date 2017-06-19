var app=angular.module('myAppHomeRagazzo', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/homeRagazzo',{
        templateUrl: 'ragazzo/homeRagazzo/homeRagazzo.html',
        controller: 'myAppHomeRagazzoCtrl',

        /*resolve: {
            "currentAuth":["Auth",function(Auth) {
                return Auth.$requireSignIn();
            }]
        }*/

    })
}]);

app.controller('myAppHomeRagazzoCtrl', ['$scope', '$rootScope', 'Evento', '$firebaseAuth',function($scope, $rootScope, Evento, $firebaseAuth){
    $scope.dati={}
    $scope.dati.feedback=""
    $scope.dati.eventi = Evento.getData()
    $scope.dati.eventi.$loaded().then(function(){

        })

    }]

);