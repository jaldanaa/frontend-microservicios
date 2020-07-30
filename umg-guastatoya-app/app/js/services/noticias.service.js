(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('NoticiasService', NoticiasService);
    
    NoticiasService.$inject = ['NoticiasRepository', '$filter'];

    function NoticiasService(noticiasRepository, $filter) {
        var service = this;

        service.getNoticias = getNoticias;
        service.getClasificaciones = getClasificaciones;
        service.getNoticia = getNoticia;
        service.getFormData = getFormData;
        service.eliminarNoticia = eliminarNoticia;
        service.noticias = [];
        service.clasificaciones = [];
        service.tituloNoticias = 'Publicaciones recientes';

        return service;

        function getNoticias(clasificacionId, tituloNoticias) {
            return noticiasRepository.getNoticias(clasificacionId).then(function (response) {
                service.tituloNoticias = tituloNoticias;
                service.noticias = response.data;
                return service.noticias;
            }).catch(function (error) {
                return error;
            })
        }

        function getNoticia(noticiaId) {
            return noticiasRepository.getNoticia(noticiaId).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return error;
            })
        }

        function getClasificaciones() {
            return noticiasRepository.getClasificaciones().then(function (response) {
                service.clasificaciones = response.data;
                return service.clasificaciones;
            }).catch(function (error) {
                return error;
            })
        }

        function eliminarNoticia(noticiaId) {
            return noticiasRepository.eliminarNoticia(noticiaId).then(function (response) {
                removerNoticia(noticiaId);
                return response.status;
            }).catch(function(error) {
                return error;
            })
        }

        function removerNoticia(noticiaId) {
            service.noticias = $filter('filter')(service.noticias, function (noticia) {
                return noticia.id != noticiaId;
            });
        }

        function getFormData(model, autorId) {
            var formData = new FormData();
            formData.append('titulo', model.titulo);
            formData.append('contenido', model.contenido);
            formData.append('clasificacion', model.clasificacion);
            formData.append('autor', model.autor);
            // Attach file
            model.imagen ? formData.append('imagen', model.imagen) : false;
            
            return formData;
        }

    }

})();