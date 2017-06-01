'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyASzMEUt7BfpWYA5WqNkijZam2OL66W3uE",
    authDomain: "pizzasonet2017.firebaseapp.com",
    databaseURL: "https://pizzasonet2017.firebaseio.com",
    projectId: "pizzasonet2017",
    storageBucket: "pizzasonet2017.appspot.com"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
  'ngRoute',
  'myApp.pizzaView',
    'myApp.pizza',
    'myApp.detailsView'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/pizzaView'});
}]);