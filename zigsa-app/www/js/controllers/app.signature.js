AppController.controller("AppSignatureCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Signature";
		$rootScope.page = "signature";
		$rootScope.from_detail = true;

		var $canvas;
		var onResize = function(event) {
			$canvas.attr({
				height: window.innerHeight,
				width: window.innerWidth
			});
		};

		$canvas = $('#pad');
		window.addEventListener('orientationchange', onResize, false);
		window.addEventListener('resize', onResize, false);
		onResize();

		setTimeout(function() {
			$('#signature').signaturePad({
				drawOnly: true,
				defaultAction: 'drawIt',
				validateFields: false,
				lineWidth: 0,
				output: null,
				sigNav: null,
				name: null,
				typed: null,
				clear: null,
				typeIt: null,
				drawIt: null,
				typeItDesc: null,
				drawItDesc: null
			});
		}, 200);
	}
]);