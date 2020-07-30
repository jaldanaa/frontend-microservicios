(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('sidebarController', sidebarController)
        .component('sidebar', {
            templateUrl: [function () {
                return 'js/components/sidebar/sidebar.html';
            }],
            controller: 'sidebarController',
            controllerAs: 'vm', //View Model
            bindings: {
                content: '<'
            }
        });
    
    sidebarController.$inject = ['NoticiasService', 'AuthenticationService', '$q'];

    function sidebarController(noticiasService, authenticationService, $q) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.authenticationService = authenticationService;
            vm.noticiasService = noticiasService;
            vm.filtrarNoticias = filtrarNoticias;
        }

        function filtrarNoticias(clasificacionId, tituloNoticias) {
            noticiasService.getNoticias(clasificacionId, tituloNoticias).then(function(response) {
                vm.noticias = response;
            }).catch(function (error) {
                console.log(error);
            })
        }

    }

})();