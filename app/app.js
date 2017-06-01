'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyDUDFC04BUxoViarP3nA3sdXX2SmZRX-Z4",
    authDomain: "scrapbook-5b34e.firebaseapp.com",
    databaseURL: "https://scrapbook-5b34e.firebaseio.com",
    projectId: "scrapbook-5b34e",
    storageBucket: "scrapbook-5b34e.appspot.com",
    messagingSenderId: "806919547565"
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