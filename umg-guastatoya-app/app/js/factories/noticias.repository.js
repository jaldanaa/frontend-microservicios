(function () {
    'use strict';

    angular.module('UniversidadApp')
        .factory('NoticiasRepository', NoticiasRepository);

    NoticiasRepository.$inject = ['$http', '$q', 'apiUrl', 'AuthenticationService'];

    function NoticiasRepository($http, $q, apiUrl, authenticationService) {
        var repository = {
            getNoticias: getNoticias,
            getClasificaciones: getClasificaciones,
            getNoticia: getNoticia,
            eliminarNoticia: eliminarNoticia
        };

        return repository;

        function getHeaders() {
            if (authenticationService.validSession()) {
                return {
                    Authorization: 'Bearer ' + authenticationService.sessionData.access
                };
            }else{
                return {};
            }
        }

        function getNoticias(clasificacionId) {
            return $http({
                method: 'GET',
                url: clasificacionId ? apiUrl + 'publicaciones?' + 'clasificacion_id=' + clasificacionId : apiUrl + 'publicaciones/',
                headers: getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getNoticia(noticiaId) {
            return $http({
                method: 'GET',
                url: apiUrl + 'publicaciones/' + noticiaId,
                headers: getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getClasificaciones() {
            return $http({
                method: 'GET',
                url: apiUrl + 'clasificaciones/',
                headers: getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function eliminarNoticia(noticiaId) {
            return $http({
                method: 'DELETE',
                url: apiUrl + 'publicaciones/' + noticiaId + '/',
                headers: getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function error(response) {
            authenticationService.verifyErrorType(response.data)
            return $q.reject(response);
        }

    }

})();