var app=angular.module('myAppSentiero', [
    'ngMaterial',
    'ngRoute'
]);

app.controller('myAppSentieroCtrl', function($scope) {
    $scope.imagePath = 'img/washedout.png';
});
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/sentiero',{
        templateUrl: 'ragazzo/sentiero/sentiero.html',
        controller: 'myAppSentieroCtrl',
        resolve: {
            "currentAuth":["Auth",function(auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);