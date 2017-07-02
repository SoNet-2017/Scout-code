'use strict';


var app=angular.module('myBioService',[])
app.factory('Bio', function($firebaseArray, $firebaseObject) {
    var bioService= {
        getData: function () {
            var ref = firebase.database().ref().child("bio");
            // download the data into a local object
            return $firebaseArray(ref);
        },
        getCartaInfo: function(bioId) {
            var bioRef = firebase.database().ref().child("bio").child(bioId);
            return $firebaseObject(bioRef);
        }
    }
    return bioService;
})
