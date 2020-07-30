(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('AuthenticationService', AuthenticationService);
    
    AuthenticationService.$inject = ['$window', 'AuthenticationRepository', '$state'];

    function AuthenticationService($window, AuthenticationRepository, $state) {
        var service = this;

        // Functions
        service.getSessionData = getSessionData;
        service.setSessionData = setSessionData;
        service.getToken = getToken;
        service.refreshSession = refreshSession;
        service.validSession = validSession;
        service.logout = logout;
        service.verifyErrorType = verifyErrorType;
        service.getHeaders = getHeaders;

        // Values
        service.currentUser = {};
        service.sessionData = getSessionData();

        return service;

        function validSession () {
            service.sessionData = getSessionData();
            return service.sessionData.access && service.sessionData.refresh;
        }


        function setSessionData(data) {
            $window.localStorage.access = data.access;
            $window.localStorage.refresh = data.refresh;
        }

        function getSessionData() {
            return {
                access: $window.localStorage.access,
                refresh: $window.localStorage.refresh,
            }
        }

        function getToken(data) {
            return AuthenticationRepository.getToken(data).then(function (response) {
                setSessionData(response.data);
                return response;
            }).catch(function (error) {
                return error;
            })
        }

        function refreshSession() {
            var refreshData = {
                refresh: service.sessionData.refresh
            };
            return AuthenticationRepository.refreshToken(refreshData).then(function(response) {
                parseJwt(response.data.access);
                return response;
            }).catch(verifyErrorType);
        }

        function verifyErrorType(error) {
            if (error.code === 'token_not_valid') {
                logout();
            }
        }

        function logout() {
            $window.localStorage.removeItem('access');
            $window.localStorage.removeItem('refresh');
            $state.go('noticias', {});
        }

        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            var jwtPayload = JSON.parse(jsonPayload);
            service.currentUser = jwtPayload.user;
        }

        function getHeaders() {
            if (validSession()) {
                return {
                    Authorization: 'Bearer ' + service.sessionData.access
                };
            }else{
                return {};
            }
        }

    }

})();