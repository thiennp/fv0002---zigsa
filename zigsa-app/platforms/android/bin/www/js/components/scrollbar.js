angular.module('scrollbar', [])
.directive('scrollbar', ['$parse', function($parse) {
    var psOptions = [
        'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
        'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
        'scrollYMarginOffset', 'includePadding'
    ];

    return {
        restrict: 'A',
        link: function($scope, $elem, $attr) {
            var options = {
                wheelSpeed: 20
            };

            for (var i=0, l=psOptions.length; i<l; i++) {
                var opt = psOptions[i];
                if ($attr[opt] != undefined) {
                    options[opt] = $parse($attr[opt])();
                }
            }

            $elem.perfectScrollbar(options);

            if ($attr.refreshOnChange) {
                $scope.$watchCollection($attr.refreshOnChange, function() {
                    $scope.$evalAsync(function() {
                        $elem.perfectScrollbar('update');
                    });
                });
            }

            $(window).resize(function(){
                $elem.perfectScrollbar('update');
            });
        }
    };
}]);