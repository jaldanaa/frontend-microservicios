(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionFormController', evaluacionFormController)
        .component('evaluacionForm', {
            templateUrl: [function () {
                return 'js/components/evaluacionForm/evaluacionForm.html';
            }],
            controller: 'evaluacionFormController',
            controllerAs: 'vm', //View Model
            bindings: {
                cursos: '<',
                evaluacion: '<'
            }
        });
    
    evaluacionFormController.$inject = ['AuthenticationService', 'EvaluacionesService', '$state'];

    function evaluacionFormController(authenticationService, EvaluacionesService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.evaluacionesService = EvaluacionesService;
            
            vm.agregarPregunta = agregarPregunta;
            vm.agregarRespuesta = agregarRespuesta;
            vm.guardarEvaluacion = guardarEvaluacion;
            
            setEvaluacionModel();
        }

        function setEvaluacionModel () {
            vm.evaluacionModel = {
                catedratico: authenticationService.currentUser.id,
                preguntas: [
                    {
                        titulo: '',
                        respuestas: [{
                            titulo: '',
                            correcto: false
                        }]
                    }
                ],
                titulo: '',
                curso: null
            }
            if (!vm.evaluacion) {
                return;
            }
            vm.evaluacionModel = {
                catedratico: vm.evaluacion.catedratico.id,
                preguntas: vm.evaluacion.preguntas,
                titulo: vm.evaluacion.titulo,
                curso: vm.evaluacion.curso.id,
                id: vm.evaluacion.id
            }
        }

        function agregarPregunta() {
            vm.evaluacionModel.preguntas.push({
                titulo: '',
                respuestas: [{
                    titulo: '',
                    correcto: false
                }]
            })
        }

        function agregarRespuesta(preguntaIndex) {
            vm.evaluacionModel.preguntas[preguntaIndex].respuestas.push({
                titulo: '',
                correcto: false
            })
        }

        function guardarEvaluacion () {
            vm.evaluacionForm.$submitted = true;
            if (vm.evaluacionForm.$invalid) {
                return;
            }
            if (vm.evaluacion) {
                EvaluacionesService.editarEvaluacion(vm.evaluacionModel).then(function(response) {
                    if (response.status === 200) {
                        alert('Evaluacion editada con exito');
                    }
                }).catch(function(error) {
                    alert('No se pudieron guardar los cambios en la evaluacion, intente nuevamente')
                });
            }else{
                EvaluacionesService.guardarEvaluacion(vm.evaluacionModel).then(function(response) {
                    if (response.status === 200) {
                        alert('Evaluacion creada con exito');
                        $state.go('evaluaciones', {});
                    }
                }).catch(function(error) {
                    alert('No se pudo guardar la evaluacion, intente nuevamente')
                });
            }
        }
    }

})();