'use strict';


var app=angular.module('myAppMeteService',[])
app.factory('Mete', function($firebaseArray, $firebaseObject) {
    var meteService= {
        getData: function () {
            var ref = firebase.database().ref().child("mete");
            // download the data into a local object
            return $firebaseArray(ref);
        },
        getMeteInfo: function(meteId) {
            var meteRef = firebase.database().ref().child("carte_specialita").child(meteId);
            return $firebaseObject(meteRef);
        },
        aggiungiMete: function (azione, codiceRagazzo, tappa) {
            console.log("entra nella function che aggiunge mete");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("mete");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                azione: azione,
                codice: codiceRagazzo,
                tappa: tappa
            });
        }
    }
    return meteService;
})
