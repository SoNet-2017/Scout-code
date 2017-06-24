'use strict';

var app=angular.module('myAppDistintiviService', []);


app.factory('Distintivo', function($firebaseArray) {
        var distintivoService = {
            getData: function () {
                var ref = firebase.database().ref().child("distintivi");
                return $firebaseArray(ref);
            }
        };
        return distintivoService;
    });
