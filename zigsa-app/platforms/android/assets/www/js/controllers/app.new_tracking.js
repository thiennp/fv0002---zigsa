AppController.controller("AppNewTrackingCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"$stateParams",
	"AppSrv",
	function($scope, $rootScope, $state, $stateParams, AppSrv) {
		if (!$stateParams.id) {
			$rootScope.pageTitle = "New Tracking";
		} else {
			$rootScope.pageTitle = "Edit Tracking";
		}
		$rootScope.page = "new_tracking";
		$scope.setting = AppSrv.getNewTrackingConfig();
		var i;

		var applyData = function(_data) {
			for (var i in _data) {
				$rootScope.over_write[i] = _data[i];
			}

			$rootScope.package_dimentions.width = _data.dimentions_width;
			$rootScope.package_dimentions.height = _data.dimentions_height;
			$rootScope.package_dimentions.length = _data.dimentions_length;
			$rootScope.package_dimentions.weight = _data.dimentions_weight;
		};

		if (!$rootScope.from_detail) {
			$rootScope.item.new_tracking = {
				photos: []
			};
			if ($stateParams.id) {
				AppSrv.getTracking($stateParams.id).then(function(data) {
					applyData(data);
					$rootScope.item.new_tracking = data;
				});
			} else {
				applyData({});
			}
		} else {
			$rootScope.from_detail = false;
			if (!$rootScope.cancel) {
				for (i in $rootScope.over_write) {
					$rootScope.item.new_tracking[i] = $rootScope.over_write[i];
				}
				$rootScope.item.new_tracking.dimentions_width = $rootScope.package_dimentions.width;
				$rootScope.item.new_tracking.dimentions_height = $rootScope.package_dimentions.height;
				$rootScope.item.new_tracking.dimentions_length = $rootScope.package_dimentions.length;
				$rootScope.item.new_tracking.dimentions_weight = $rootScope.package_dimentions.weight;
			}
			applyData($rootScope.item.new_tracking);
		}

		$scope.addresses = AppSrv.getAddress();
		$scope.locations = AppSrv.getLocation();
		if ($rootScope.signature) {
			$rootScope.item.new_tracking.signature = $rootScope.signature;
		}
		delete $rootScope.signature;

		$scope.randomReceipt = function() {
			var time = new Date().getTime();
			$rootScope.item.new_tracking.receipt = String(time).substr(4, 7);
		};

		$scope.packageDetail = function() {
			for (var i in $rootScope.item.new_tracking) {
				$rootScope.over_write[i] = $rootScope.item.new_tracking[i];
				console.log(i);
			}
			$state.go("app.package_info");
		};

		$scope.signatureDetail = function() {
			for (var i in $rootScope.item.new_tracking) {
				$rootScope.over_write[i] = $rootScope.item.new_tracking[i];
			}
			$state.go("app.signature");
		};

		$scope.removeSignature = function() {
			delete $rootScope.item.new_tracking.signature;
		};

		$scope.scanReceipt = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.item.new_tracking.receipt = result.text;
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.scanCarrierTracking = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.item.new_tracking.carrier_tracking = result.text;
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.scanLocation = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.item.new_tracking.location = result.text;
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.takePhoto = function() {
			navigator.camera.getPicture(onSuccess, onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL
			});

			function onSuccess(imageData) {
				$rootScope.item.new_tracking.photos.push('data:image/jpeg;base64,'+imageData);
				$rootScope.$apply();
			}

			function onFail(message) {
				alert('Failed because: ' + message);
			}
		};

		$scope.addFile = function() {
			var oFReader = new FileReader();
			oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
			oFReader.onloadend = function(oFREvent) {
				$rootScope.item.new_tracking.photos.push('data:image/jpeg;base64,'+oFREvent.target.result.substring(12));
				$rootScope.$apply();
			};
		};

		$scope.deletePhoto = function(_index) {
			$rootScope.item.new_tracking.photos.splice(_index, 1);
		};
	}
]);