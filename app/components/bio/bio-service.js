'use strict';


var app=angular.module('myAppBioService',[])
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
        },
        aggiornaBioDescrizione: function(codice, nuovaDescrizione) {
            var ref = firebase.database().ref().child("bio").child(codice);
            // create a synchronized array
            ref.update({
                descrizione: nuovaDescrizione
            });

        },
        aggiornaBioFoto: function(codice, nuovaFoto) {
            var ref = firebase.database().ref().child("bio").child(codice);
            // create a synchronized array
            ref.update({
                foto_url: nuovaFoto
            });

        },
        aggiornaBioHobby: function(codice, nuovoHobby) {
            var ref = firebase.database().ref().child("bio").child(codice);
            // create a synchronized array
            ref.update({
                hobby: nuovoHobby
            });

        }


    }
    return bioService;
})
