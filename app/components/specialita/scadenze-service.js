'use strict';

var app=angular.module('myAppScadenzeService', []);


app.factory('Scadenza', function($firebaseArray) {
        var scadenzeService = {
            getData: function () {
                var ref = firebase.database().ref().child("scadenze");
                return $firebaseArray(ref);
            },

            aggiornaScadenze: function (uuid, checked) {
                console.log("sono entrato nello scadenze service, aggiorna scadenze");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - checked: " + checked);

                var ref = firebase.database().ref().child("scadenze").child(uuid);
                // create a synchronized array
                if (checked == 'true'){
                    ref.update({
                        conferma: true
                    });
                }
            }
        };
        return scadenzeService;
    });
