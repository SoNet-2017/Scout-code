'use strict';


var app=angular.module('myAppRegistrazioneBioService',[]);


app.factory('RegistrazioneBioService', function($firebaseArray) {

    var nuovoBio= {
        aggiungiBio: function (codice, descrizione, foto_url, hobby, impegni) {
            console.log("entra nella function che aggiunge un bio");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("bio");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                codice:""+codice,
                descrizione: descrizione,
                foto_url:""+foto_url,
                hobby:hobby,
                impegni:impegni

            });
        }
    };
    return nuovoBio;
});

