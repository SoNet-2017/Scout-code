'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myAppUtente.registrazioneRagazzoService', [])

    .factory('RegistrazioneRagazzoService', function($firebaseArray) {
        var NuovoRagazzoService = {
            aggiungiRagazzo: function (codice, nome, cognome) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    codice: codice,
                    nome: nome,
                    cognome: cognome,
                    ruolo: ragazzo
                });
            },
            aggiornaUtente: function (ragazzoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti").child(ragazzoId);
                // create a synchronized array
                ref.update({
                    id: ragazzoId
                });
            }
        };
        return NuovoRagazzoService;
    });
