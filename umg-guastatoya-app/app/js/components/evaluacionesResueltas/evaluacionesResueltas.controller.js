(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionesResueltasController', evaluacionesResueltasController)
        .component('evaluacionesResueltas', {
            templateUrl: [function () {
                return 'js/components/evaluacionesResueltas/evaluacionesResueltas.html';
            }],
            controller: 'evaluacionesResueltasController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluacionesResueltas: '<'
            }
        });
    
    evaluacionesResueltasController.$inject = ['AuthenticationService', '$state'];

    function evaluacionesResueltasController(authenticationService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.verEvaluacionResuelta = verEvaluacionResuelta;   
        }

        function verEvaluacionResuelta (evaluacionId) {
            $state.go('evaluacionResuelta', {id: evaluacionId});
        }
    }

})();