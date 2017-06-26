'use strict';


var app=angular.module('myAppRegistrazioneCartaSpecialitaService',[]);


app.factory('RegistrazioneCartaSpecialitaService', function($firebaseArray) {

        var NuovaCartaSpecialita = {
            aggiungiCarta: function (img_url, specialitaNome, codiceMaestro, codiceRagazzo, specialitaCodice) {
                console.log("entra nella function che aggiunge un ragazzo");


                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("carta_specialita");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    img_url:img_url,
                    maestro:""+codiceMaestro+"",
                    motivazione:"",
                    nome:specialitaNome,
                    ragazzo:""+codiceRagazzo+"",
                    specialita:specialitaCodice
                });
            }
        };
        return NuovaCartaSpecialita;
    });

