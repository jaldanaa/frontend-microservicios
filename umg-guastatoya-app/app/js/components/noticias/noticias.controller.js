(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('noticiasController', noticiasController)
        .component('noticias', {
            templateUrl: [function () {
                return 'js/components/noticias/noticias.html';
            }],
            controller: 'noticiasController',
            controllerAs: 'vm', //View Model
            bindings: {}
        });
    
    noticiasController.$inject = ['NoticiasService', 'AuthenticationService', '$q', '$state'];

    function noticiasController(noticiasService, authenticationService, $q, $state) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.authenticationService = authenticationService;
            vm.noticiasService = noticiasService;
            vm.editarNoticia = editarNoticia;
            vm.eliminarNoticia = eliminarNoticia;
            initialLoad();
        }

        function initialLoad() {
            var promises = [noticiasService.getNoticias(null, 'Publicaciones Recientes'), noticiasService.getClasificaciones()];
            $q.all(promises)
        }

        function editarNoticia (noticiaId) {
            $state.go('noticia', {id: noticiaId});
        }

        function eliminarNoticia (noticiaId) {
            if (!confirm('Esta seguro que desea eliminar esta publicacion?')) {
                return;
            }
            noticiasService.eliminarNoticia(noticiaId).then(function(response) {
                if (response === 204) {
                    alert('Publicacion Eliminada con exito');
                }
            }).catch(function (error) {
                console.log(error);
            })
        }

    }

})();