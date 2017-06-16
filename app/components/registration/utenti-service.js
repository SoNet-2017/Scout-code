'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppUtente.utentiService', [])

    .factory('Utente', function($firebaseArray) {
        var utentiService = {
            getData: function () {
                var ref = firebase.database().ref().child("utenti");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return utentiService;
    });
