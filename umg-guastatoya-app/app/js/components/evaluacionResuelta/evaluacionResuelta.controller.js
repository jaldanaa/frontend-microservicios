(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionResueltaController', evaluacionResueltaController)
        .component('evaluacionResuelta', {
            templateUrl: [function () {
                return 'js/components/evaluacionResuelta/evaluacionResuelta.html';
            }],
            controller: 'evaluacionResueltaController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluacionResuelta: '<'
            }
        });
    
    evaluacionResueltaController.$inject = ['AuthenticationService', 'EvaluacionesService', '$state'];

    function evaluacionResueltaController(authenticationService, EvaluacionesService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.evaluacionesService = EvaluacionesService;

        }

    }

})();