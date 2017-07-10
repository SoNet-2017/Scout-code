'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myAppUtente.registrazioneRagazzoService', [])

    .factory('RegistrazioneRagazzoService', function($firebaseArray) {

        var RagazzoService = {

           aggiungiRagazzo: function (codice, nome, cognome, sesso) {
                console.log("entra nella function che aggiunge un ragazzo");
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    codice: ""+codice+"",
                    nome: nome,
                    cognome: cognome,
                    ruolo: "ragazzo",
                    sq: "",
                    email: "",
                    logged: false,
                    img: "../images/default_profile.png",
                    sesso: sesso,
                    tappa:"",
                    descrizione:"",
                    hobby:"",
                    img_impegni:""
                });
            },


            aggiornaBio: function(codice, nuovaDescrizione, nuoviHobby) {
               console.log("sono entrato nell'aggiorna bio");

                var ref = firebase.database().ref().child("utenti").child(codice);
                // create a synchronized array
                ref.update({
                    descrizione: nuovaDescrizione,
                    hobby: nuoviHobby
                });

            },


            aggiornaFoto: function(codice, nuovaFoto) {
                var ref = firebase.database().ref().child("utenti").child(codice);
                // create a synchronized array
                ref.update({
                    img: nuovaFoto
                });

            },

            aggiornaImpegni: function(codice, nuovaFoto) {
                var ref = firebase.database().ref().child("utenti").child(codice);
                // create a synchronized array
                ref.update({
                    img_impegni: nuovaFoto
                });

            }




        };
        return RagazzoService;
    });
