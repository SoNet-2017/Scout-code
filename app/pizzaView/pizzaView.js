'use strict';

angular.module('myApp.pizzaView', ['ngRoute','myApp.pizza'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pizzaView', {
    templateUrl: 'pizzaView/pizzaView.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','Pizza',function($scope,Pizza) {
    $scope.dati={};
    $scope.dati.pizzas = Pizza.getData();
}]);