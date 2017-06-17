var app=angular.module('myAppHomeCapo', [
    'ngMaterial',
    'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/homeCapo',{
        templateUrl: 'capo/homeCapo/homeCapo.html',
        controller: 'myAppHomeCapoCtrl',
        /*IN ATTESA DEL LOGIN
        resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }
        */
    })
}]);

app.controller('myAppHomeCapoCtrl', function($scope) {

});