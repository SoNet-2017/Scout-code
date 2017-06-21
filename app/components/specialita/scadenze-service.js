'use strict';

var app=angular.module('myAppScadenzeService', []);


app.factory('Scadenza', function($firebaseArray) {
        var scadenzeService = {
            getData: function () {
                var ref = firebase.database().ref().child("scadenze");
                return $firebaseArray(ref);
            }
        };
        return scadenzeService;
    });
