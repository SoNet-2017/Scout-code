'use strict';

var app=angular.module('myAppSpecialitaService', []);


app.factory('Specialita', function($firebaseArray) {
        var specialitaService = {
            getData: function () {
                var ref = firebase.database().ref().child("specialita");
                return $firebaseArray(ref);
            }
        };
        return specialitaService;
    });
