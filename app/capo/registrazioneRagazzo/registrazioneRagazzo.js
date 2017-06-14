'use strict';

angular.module('myAppRegistrazioneRagazzo', [
    'ngMaterial',
    'ngMessages',
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrazioneRagazzo', {
            templateUrl: 'capo/registrazioneRagazzo/registrazioneRagazzo.html',
            controller: 'RegistrazioneRagazzoCtrl'
        });
    }])

    .controller('RegistrazioneRagazzoCtrl', ['$scope', '$rootScope', 'RegistrazioneRagazzoService', '$firebaseStorage',
        function($scope, $rootScope, RegistrazioneRagazzoService, $firebaseStorage) {
            //initialize variables
            $scope.dati = {};
            //set the variable that is used in the main template to show the active button
            $rootScope.dati.currentView = "registrazioneragazzo";
            $scope.dati.feedback = "";
            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath= "";
            //define the function that will actually create a new record in the database
            $scope.registrazioneRagazzo = function() {
                console.log("ho premuto su REGISTRA");
                //check if the user inserted all the required information
                if ($scope.dati.codice!= undefined && $scope.dati.codice!="" && $scope.dati.nome!= undefined && $scope.dati.nome!="" && $scope.dati.cognome!=undefined && $scope.dati.cognome!="") {
                    $scope.dati.error = "";

                    //try to upload the image: if no image was specified, we create a new pizza without an image
                    if ($scope.fileToUpload != null) {
                        //get the name of the file
                        var fileName = $scope.fileToUpload.name;
                        //specify the path in which the file should be saved on firebase
                        var storageRef = firebase.storage().ref("utentiImg/" + fileName);
                        $scope.storage = $firebaseStorage(storageRef);
                        var uploadTask = $scope.storage.$put($scope.fileToUpload);
                        uploadTask.$complete(function (snapshot) {
                            $scope.imgPath = snapshot.downloadURL;
                            $scope.aggiuntaRagazzoFinale();
                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " - the Pizza will be added without a descriptive image!";
                            //add the pizza in any case (without the image)
                            $scope.aggiuntaRagazzoFinale();
                        });
                    }


                    else {
                        //do not add the image
                        $scope.aggiuntaRagazzoFinale();

                    }
                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Hai dimenticato di inserire una informazione obbligatoria!";
                }
            };
            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };
            //function that will create the new record (with the pizza) in the Firebase storage
            $scope.aggiuntaRagazzoFinale = function()
            {
                RegistrazioneRagazzoService.aggiungiRagazzo($scope.dati.codice, $scope.dati.nomea, $scope.dati.cognome, $scope.imgPath).then(function(ref) {
                    var ragazzoId = ref.key;
                    RegistrazioneRagazzoService.aggiornaUtente(ragazzoId);
                    $scope.dati.feedback = "Il ragazzo è stato aggiunto con successo";
                    $scope.dati.codice = "";
                    $scope.dati.nome = "";
                    $scope.dati.cognome = "";
                });
            }
        }]);