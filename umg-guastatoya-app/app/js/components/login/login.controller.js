(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('loginController', loginController)
        .component('login', {
            templateUrl: [function () {
                return 'js/components/login/login.html';
            }],
            controller: 'loginController',
            controllerAs: 'vm', //View Model
            bindings: {}
        });
    
    loginController.$inject = ['AuthenticationService', '$state'];

    function loginController(authenticationService, $state) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            verifySession();
            vm.noticias = [];
            vm.loginFunction = login;
            vm.credenciales = {
                username: '',
                password: ''
            }
            vm.failedLogin = false;
        }

        function verifySession() {
            if (authenticationService.validSession()) {
                $state.go('noticias', {});
            }
        }

        function login() {
            vm.failedLogin = false;
            if (vm.loginForm.$invalid) {
                return;
            }
            authenticationService.getToken(vm.credenciales).then(function (response) {
                if (response.status === 200) {
                    $state.go('noticias', {});
                } else {
                    vm.failedLogin = true;
                }
            }).catch(function (error) {
                vm.failedLogin = true;
            });
        }
    }

})();