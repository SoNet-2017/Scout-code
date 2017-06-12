var app=angular.module('myAppProfilo', [
    'ngMaterial',
    'ngRoute'
]);


app.controller('myAppProfiloCtrl', function($scope) {

    });


app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profilo', {
            templateUrl: 'ragazzo/profilo/profilo.html',
            controller: 'myAppProfiloCtrl',
            /* IN ATTESA DEL LOGIN
            resolve: {
                "currentAuth":["Auth",function(auth) {
                    return Auth.$requireSignIn();
                }]
            }
             */
        })
    }]);