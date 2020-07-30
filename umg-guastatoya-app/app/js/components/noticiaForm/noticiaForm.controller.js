(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('noticiaFormController', noticiaFormController)
        .component('noticiaForm', {
            templateUrl: [function () {
                return 'js/components/noticiaForm/noticiaForm.html';
            }],
            controller: 'noticiaFormController',
            controllerAs: 'vm', //View Model
            bindings: {
                noticia: '<'
            }
        });
    
    noticiaFormController.$inject = ['AuthenticationService', 'NoticiasService', '$q', '$scope', 'apiUrl', '$window', '$stateParams'];

    function noticiaFormController(authenticationService, noticiasService, $q, $scope, apiUrl, $window, $stateParams) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.noticiasService = noticiasService;
            vm.guardarNoticia = guardarNoticia;
            initialLoad();
        }

        function setInitialModel () {
            vm.noticiaModel = {
                titulo: '',
                contenido: '',
                clasificacion: null,
                imagen: null,
                autor: authenticationService.currentUser.id
            }
            if (vm.noticia) {
                vm.noticiaModel.titulo = vm.noticia.titulo;
                vm.noticiaModel.contenido = vm.noticia.contenido;
                vm.noticiaModel.clasificacion = vm.noticia.clasificacion.id;
                vm.noticiaModel.autor = vm.noticia.autor.id;
            }
        }

        function initialLoad() {
            setInitialModel()
            var promises = [noticiasService.getClasificaciones()];
            $q.all(promises)
        }

        function guardarNoticia() {
            if (vm.noticiaForm.$invalid) {
                return;
            }
            vm.noticiaModel.imagen = $scope.file;
            var errorText = vm.noticia ? 'Error al editar la publicacion, intente de nuevo.' : 'Error al crear la publicacion, intente de nuevo.';
            var successText = vm.noticia ? 'Publicacion editada con exito.' : 'Publicacion creada con exito.';
            var autor = vm.noticia ? vm.noticia.autor : null;
            var formData = noticiasService.getFormData(vm.noticiaModel, autor);
            var method = vm.noticia ? 'PATCH' : 'POST';
            var url = vm.noticia ? apiUrl + 'publicaciones/' + vm.noticia.id + '/' : apiUrl + 'publicaciones/';
            jQuery.ajax({
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                type: method,
                headers: {
                    Authorization: 'Bearer ' + authenticationService.sessionData.access
                },
                success: function(response){
                    if (response.id) {
                        alert(successText);
                        !vm.noticia ? $window.location.reload() : false;
                    }
                },
                error: function(error) {
                    alert(errorText);
                }
            });
        }
    }

})();