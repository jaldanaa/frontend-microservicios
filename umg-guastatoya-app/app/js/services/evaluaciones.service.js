(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('EvaluacionesService', EvaluacionesService);
    
    EvaluacionesService.$inject = ['EvaluacionesRepository', '$filter'];

    function EvaluacionesService(EvaluacionesRepository, $filter) {
        var service = this;

        service.guardarEvaluacion = guardarEvaluacion;
        service.getCursos = getCursos;
        service.getEvaluaciones = getEvaluaciones;
        service.getEvaluacion = getEvaluacion;
        service.editarEvaluacion = editarEvaluacion;
        service.resolverEvaluacion = resolverEvaluacion;
        service.getEvaluacionesResueltas = getEvaluacionesResueltas;
        service.getEvaluacionResuelta = getEvaluacionResuelta;

        return service;

        function cleanModel(data) {
            var cleanAnswers = $filter('filter')(data.respuestas, function (id) {
                return id;
            });
            data.respuestas = cleanAnswers;
            return data;
        }

        function guardarEvaluacion(evaluacionModel) {
            return EvaluacionesRepository.guardarEvaluacion(evaluacionModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        function editarEvaluacion(evaluacionModel) {
            return EvaluacionesRepository.editarEvaluacion(evaluacionModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        function getEvaluaciones() {
            return EvaluacionesRepository.getEvaluaciones().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        function getEvaluacionesResueltas() {
            return EvaluacionesRepository.getEvaluacionesResueltas().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        function getEvaluacion(evaluacionId) {
            return EvaluacionesRepository.getEvaluacion(evaluacionId).then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        function getEvaluacionResuelta(evaluacionId) {
            return EvaluacionesRepository.getEvaluacionResuelta(evaluacionId).then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        function getCursos() {
            return EvaluacionesRepository.getCursos().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        function resolverEvaluacion(data) {
            var cleanData = cleanModel(data);
            return EvaluacionesRepository.resolverEvaluacion(cleanData).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

    }

})();