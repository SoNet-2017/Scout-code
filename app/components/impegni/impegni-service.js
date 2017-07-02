'use strict';


var app=angular.module('myAppImpegniService',[])
app.factory('Impegni', function($firebaseArray, $firebaseObject) {
    var impegniService= {
        getData: function () {
            var ref = firebase.database().ref().child("impegni");
            // download the data into a local object
            return $firebaseArray(ref);
        },
        getImpegniInfo: function(impegniId) {
            var impegniRef = firebase.database().ref().child("impegni").child(impegniId);
            return $firebaseObject(impegniRef);
        },
        aggiungiImpegni: function (azione, codiceRagazzo, tappa) {
            console.log("entra nella function che aggiunge impegni");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("impegni");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                azione: azione,
                codice: codiceRagazzo,
                tappa: tappa
            });
        },
        aggiornaImpegniAzione: function(codice, nuovoImpegno) {
            var ref = firebase.database().ref().child("impegni").child(codice);
            // create a synchronized array
            ref.update({
                azione: nuovoImpegno
            });
        },
        aggiornaImpegniTappa: function(codice, nuovaTappa) {
            var ref = firebase.database().ref().child("impegni").child(codice);
            // create a synchronized array
            ref.update({
                tappa: nuovaTappa
            });
        }
    }
    return impegniService;
})

