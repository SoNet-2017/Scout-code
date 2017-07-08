'use strict';

var app=angular.module('myAppBrevettiService', []);


app.factory('Brevetti', function($firebaseArray) {
    var brevettiService = {
        getData: function () {
            var ref = firebase.database().ref().child("brevetti");
            return $firebaseArray(ref);
        }
    };
    return brevettiService;
});
