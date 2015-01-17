AppController.controller("AppFooterSignatureCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$scope.save = function() {
			$rootScope.cancel = false;
			var canvas = document.getElementById("pad");
			var ctx = canvas.getContext("2d");
			var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var data = imageData.data;
			var canvasTop = canvas.height;
			var canvasLeft = canvas.width;
			var canvasRight = 0;
			var canvasBottom = 0;
			var signatureData = [];
			var i, j, pos;

			for (i = 0; i < canvas.height; i++) {
				for (j = 0; j < canvas.width * 4; j += 4) {
					pos = canvas.width * 4 * i + j;
					if (data[pos] != 255 || data[pos + 1] != 255 || data[pos + 2] != 255) {
						if (canvasTop == canvas.height) {
							canvasTop = i - 10;
						}
						canvasBottom = i + 10;
					}
				}
			}

			for (j = 0; j < canvas.width * 4; j += 4) {
				for (i = 0; i < canvas.height; i++) {
					pos = canvas.width * 4 * i + j;
					if (data[pos] != 255 || data[pos + 1] != 255 || data[pos + 2] != 255) {
						if (canvasLeft == canvas.width) {
							canvasLeft = j / 4 - 10;
						}
						canvasRight = j / 4 + 10;
					}
				}
			}

			$rootScope.signature = canvas.toDataURL();

			canvas = document.getElementById('hiddenPad');
			var context = canvas.getContext('2d');

			var imageObj = new Image();

			imageObj.onload = function() {
				var dataW = canvasRight - canvasLeft;
				var dataH = canvasBottom - canvasTop;
				$canvas = $('hiddenPad');
				$('#hiddenPad').attr({
					height: dataH,
					width: dataW
				});
				var sourceX = canvasLeft;
				var sourceY = canvasTop;
				var sourceWidth = dataW;
				var sourceHeight = dataH;
				var destWidth = sourceWidth;
				var destHeight = sourceHeight;
				var destX = 0;
				var destY = 0;
				context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
				$rootScope.signature = canvas.toDataURL();
				$rootScope.back();
			};
			imageObj.src = $rootScope.signature;
		};

		$scope.cancel = function() {
			$rootScope.cancel = true;
			$rootScope.back();
		};
	}
]);