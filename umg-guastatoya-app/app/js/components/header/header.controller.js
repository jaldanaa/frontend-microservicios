(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('headerController', headerController)
        .component('headerComponent', {
            templateUrl: [function () {
                return 'js/components/header/header.html';
            }],
            controller: 'headerController',
            controllerAs: 'vm', //View Model
            bindings: {
                content: '<'
            }
        });
    
    headerController.$inject = ['AuthenticationService'];

    function headerController(authenticationService) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
        }
    }

})();