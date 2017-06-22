'use strict';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDUDFC04BUxoViarP3nA3sdXX2SmZRX-Z4",
    authDomain: "scrapbook-5b34e.firebaseapp.com",
    databaseURL: "https://scrapbook-5b34e.firebaseio.com",
    projectId: "scrapbook-5b34e",
    storageBucket: "scrapbook-5b34e.appspot.com",
    messagingSenderId: "806919547565"
};
firebase.initializeApp(config);

var app = angular.module('myApp', [
        'ngMaterial',
        'ngRoute',
        "firebase",
        'myAppSentiero',
        'myAppHomeRagazzo',
        'myAppFiamma',
        'myAppLogin',
        'myAppAuthentication',
        'myAppHomeCapo',
        'myAppRegistrazioneRagazzo',
        'myAppSquadriglia',
        'myAppListaSpecialita',
        'myAppRegistration',
        'myAppSquadriglia',
        'myAppFormaSquadriglie',
        'myAppStaff',
        'myAppEvento',
        'myAppAssegnaTappa',
        'myAppSpecialita',
        'myAppCartaSpecialita',
        'myAppProfiloCapo',
        'myAppUtente',
        'myAppConfermaScadenze'
    ]);


app.config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function($locationProvider, $routeProvider, $mdThemingProvider) {

    //TEMA DELL'APP
    $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('light-green');


    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/homeCapo'
    });
}]);


app.run(["$rootScope", "$location", function($rootScope, $location){

    console.log("sono nel run del app.js")

    $rootScope.$on("$routeChangeError",function(event, next, previous, error){
        console.log("sono nel on change route error del run del app.js")
        if(error==="AUTH_REQUIRED"){
            $location.path("/login");
        }
    });


}]);




app.controller('LogCtrl', ['$scope', '$rootScope', 'Utente', '$firebaseAuth', '$location', function($scope, $rootScope, Utente, $firebaseAuth, $location) {

    //variabile che permette di scaricare i dati dell'utente loggato solo una volta all'avvio dell'app
    $rootScope.info.info = false;


    $scope.isLogged = function()
    {
        if ($firebaseAuth().$getAuth()) {
            if ($rootScope.info.info == false) {
                $scope.InfoUserLogged();
            }

            return true;
        }
        else
            return false;
    }


    $scope.InfoUserLogged = function() {
        $rootScope.info.info == true;
        console.log("sono entrato nella funzione InfoUserLogged ");
        $rootScope.info={};
        $rootScope.info.user = Utente.getUserInfo($firebaseAuth().$getAuth().uid);
    }
}]);





app.controller('AppCtrl1', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {

    $rootScope.info={};


        $scope.toggleLeft = buildDelayedToggler('left');

        $scope.notifiche = function() {
            console.log("Hai cliccato su notifiche");
            $scope.data = {
                menu : "notifications"
            };
            console.log("vado al build toggler");

            $scope.toggleRight = buildToggler('right');
            $scope.toggleRight();
        };

        $scope.eventi = function() {
            console.log("Hai cliccato su eventi");

            $scope.data = {
                menu : "events"
            };
            console.log("vado al build toggler");

            $scope.toggleRight = buildToggler('right');
            $scope.toggleRight();
        };



        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    });


app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    });

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });






app.controller('EventCtrl', ['$scope','$rootScope', 'Evento', function($scope,$rootScope, Evento) {

    //initialize variables
    $scope.dati={};
    $scope.dati.feedback = "";
    //get the list of available sq
    $scope.dati.eventi = Evento.getData();
    $scope.dati.eventi.$loaded().then(function () {
    });
}]);








