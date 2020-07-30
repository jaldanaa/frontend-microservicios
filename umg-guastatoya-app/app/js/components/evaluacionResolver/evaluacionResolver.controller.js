(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionResolverController', evaluacionResolverController)
        .component('evaluacionResolver', {
            templateUrl: [function () {
                return 'js/components/evaluacionResolver/evaluacionResolver.html';
            }],
            controller: 'evaluacionResolverController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluacion: '<'
            }
        });
    
    evaluacionResolverController.$inject = ['AuthenticationService', 'EvaluacionesService', '$state'];

    function evaluacionResolverController(authenticationService, EvaluacionesService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.evaluacionesService = EvaluacionesService;

            vm.resolverEvaluacion = resolverEvaluacion;
            
            vm.evaluacionResueltaModel = {
                respuestas: [],
                evaluacion: vm.evaluacion.id,
                estudiante: authenticationService.currentUser.id
            }
        }

        function resolverEvaluacion() {
            EvaluacionesService.resolverEvaluacion(vm.evaluacionResueltaModel).then(function(response) {
                if (response.status === 200) {
                    alert('La evaluacion se guardo con exito');
                    $state.go('evaluacionesResueltas', {});
                }
            }).catch(function(error) {
                console.log(error);
                alert('Error al guardar la evaluacion, intente nuevamente.')
            });
        }
    }

})();