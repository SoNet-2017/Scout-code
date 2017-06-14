'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myAppUtente', [
    //'myAppUtente.pizzaService',
    //'myAppUtente.singlePizzaService',
    'myAppUtente.registrazioneRagazzoService'
])

.value('version', '0.1');
