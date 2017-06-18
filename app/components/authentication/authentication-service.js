'use strict';

//This module implement the service that handle the $firebaseAuth
var app=angular.module('myAppAuthenticationService', [])

    .factory('Auth', ["$firebaseAuth", function($firebaseAuth) {
        return $firebaseAuth();
    }]);