var app=angular.module('myAppSentiero', [
    'ngMaterial',
    'ngRoute',
    'myAppListaSpecialita'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sentiero',{
        templateUrl: 'ragazzo/sentiero/sentiero.html',
        controller: 'myAppSentieroCtrl',
        /* IN ATTESA DI LOGIN
        resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }
        */
    })
}]);

app.controller('myAppSentieroCtrl', function($scope) {

});