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
        'myAppProfilo',
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
        'myAppEvento'
    ]);


app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/login'});
}]);


app.run(["$rootScope", "$location", function($rootScope, $location){
    $rootScope.$on("$routeChangeEttor",function(event, next, previous, error){
        if(error==="AUTH_REQUIRED"){
            $location.path("/login");
        }
    })
}]);



// .controller('userProfileCtrl', ['$scope', '$rootScope', 'UsersChatService', 'Users', function($scope, $rootScope, UsersChatService, Users, currentAuth, $firebaseAuth, $location) {


app.controller('LogCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'Utente', function($scope, $rootScope, $firebaseAuth, Utente) {
    //this controller only declares a function to get information about the user status (logged in / out)
    //it is used to show menu buttons only when the user is logged
    $scope.dati={};

    //set the variable that is used in the main template to show the active button
    $scope.isLogged = function()
    {
        if ($firebaseAuth().$getAuth())
            return true;
        else
            return false;
    }


    // function called when the "logout" button will be pressed
    $scope.logout = function () {

        //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
        Utente.registerLogout(currentAuth.uid);
        //sign out
        $firebaseAuth().$signOut();
        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                console.log("User is yet signed in as:", firebaseUser.uid);
            } else {
                $location.path("/loginView");
            }
        });


    };
}]);


app.controller('AppCtrl1', function ($scope, $timeout, $mdSidenav, $log) {
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







