'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppUtente.utentiService', [])

    .factory('Utente', function($firebaseArray) {
        var utentiService = {
            getData: function () {
                var ref = firebase.database().ref().child("utenti");
                // download the data into a local object
                return $firebaseArray(ref);
            },

            aggiornaStaff: function (uuid, checked) {
                console.log("sono entrato nello staff service, aggiorna staff");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - checked: " + checked);

                var ref = firebase.database().ref().child("utenti").child(uuid);
                // create a synchronized array
                if (checked == 'true'){
                    ref.update({
                        staff: true
                    });
                }
                else if (checked == 'false'){
                    ref.update({
                        staff: false
                    });
                }
            },

            aggiornaSq: function (uuid, newSq) {
                console.log("sono entrato nello sq service, aggiorna sq");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - newSq: " + newSq);

                var ref = firebase.database().ref().child("utenti").child(uuid);
                // create a synchronized array
                ref.update({
                    sq: newSq
                });
            }
        };
        return utentiService;
    });
