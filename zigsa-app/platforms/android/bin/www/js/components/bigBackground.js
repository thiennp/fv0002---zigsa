angular.module('bigBackground.directive', []).directive("bigBackground", function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            bigBackground: "="
        },
        link: function (scope, elem) {
            var medias = scope.bigBackground;

            var media = medias[Math.floor(Math.random() * (medias.length))];
            var mediaUrl = media;

            var ext = media.substring(media.lastIndexOf('.') + 1);
            var dom;
            var mediaType = /jpg|png|gif/i.test(ext) ? 'image' : 'video';

            switch (mediaType){
                case 'video':
                    dom = $('<video autoplay id="bigbackground" muted><source src="' + mediaUrl + '"></video>');
                    break;
                case 'image':
                    dom = $('<img id="bigbackground" src="' + mediaUrl + '"/>');
                    break;
            }

            elem.prepend(dom);

        }
    }
});