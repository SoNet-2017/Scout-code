'use strict';

angular.module('myApp.pizzaView', ['ngRoute','myApp.pizza'])

.config(['$routeProvider', function($routeProvider) {
    if vari = ...
        templk = abc.html
    else
        templ = def.htnkl
  $routeProvider.when('/pizzaView', {
    templateUrl: templk,
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','Pizza',function($scope,Pizza) {
    $scope.dati={};
    $scope.dati.pizzas = Pizza.getData();
}]);