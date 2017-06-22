'use strict';


var app=angular.module('myAppRegistrazioneCartaSpecialitaService',[]);


app.factory('RegistrazioneCartaSpecialitaService', function($firebaseArray) {

        var NuovaCartaSpecialita = {
            aggiungiRagazzo: function (specialita, maestro, ragazzo) {
                console.log("entra nella function che aggiunge un ragazzo");


                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("carta_specialita");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    img_url:specialita.img_url,
                    maestro:maestro,
                    motivazione:"",
                    nome:specialita.nome,
                    ragazzo:ragazzo,
                    specialita:specialita
                });
            }
        };
        return NuovaCartaSpecialita;
    });

