AppController.controller("AppTrackingUpdateCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"$stateParams",
	"AppSrv",
	function($scope, $rootScope, $state, $stateParams, AppSrv) {
		$rootScope.pageTitle = "Tracking Update";
		$rootScope.page = "tracking_update";
		$scope.setting = AppSrv.getTrackingUpdateConfig();
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
			$rootScope.item.tracking_update = {
				photos: []
			};
			if ($stateParams.id) {
				AppSrv.getTrackingUpdate($stateParams.id).then(function(data) {
					applyData(data);
					$rootScope.item.tracking_update = data;
				});
			} else {
				applyData({});
			}
		} else {
			$rootScope.from_detail = false;
			if (!$rootScope.cancel) {
				for (i in $rootScope.over_write) {
					$rootScope.item.tracking_update[i] = $rootScope.over_write[i];
				}
				$rootScope.item.tracking_update.dimentions_width = $rootScope.package_dimentions.width;
				$rootScope.item.tracking_update.dimentions_height = $rootScope.package_dimentions.height;
				$rootScope.item.tracking_update.dimentions_length = $rootScope.package_dimentions.length;
				$rootScope.item.tracking_update.dimentions_weight = $rootScope.package_dimentions.weight;
			}
			applyData($rootScope.item.tracking_update);
		}

		$scope.addresses = AppSrv.getAddress();
		$scope.locations = AppSrv.getLocation();
		$scope.predefineText = AppSrv.getPredefineText();
		if ($rootScope.signature) {
			$rootScope.item.tracking_update.signature = $rootScope.signature;
		}
		delete $rootScope.signature;

		$scope.updateNumber = function() {
			$rootScope.numberUpdated = true;
		};

		$scope.updateComment = function() {
			$rootScope.item.tracking_update.comment = $scope.comment_predefined_text;
		};

		$scope.updateAddress = function() {
			$rootScope.item.tracking_update.address = $scope.address_location;
		};

		$scope.packageDetail = function() {
			for (var i in $rootScope.item.tracking_update) {
				$rootScope.over_write[i] = $rootScope.item.tracking_update[i];
			}
			$state.go("app.package_info");
		};

		$scope.signatureDetail = function() {
			for (var i in $rootScope.item.tracking_update) {
				$rootScope.over_write[i] = $rootScope.item.tracking_update[i];
			}
			$state.go("app.signature");
		};

		$scope.removeSignature = function() {
			delete $rootScope.item.tracking_update.signature;
		};

		$scope.scanTrackingNumber = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.item.tracking_update.tracking_number = Number(result.text);
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
					$rootScope.item.tracking_update.location = result.text;
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
				$rootScope.item.tracking_update.photos.push('data:image/jpeg;base64,'+imageData);
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
				$rootScope.item.tracking_update.photos.push('data:image/jpeg;base64,'+oFREvent.target.result.substring(12));
				$rootScope.$apply();
			};
		};

		$scope.deletePhoto = function(_index) {
			$rootScope.item.tracking_update.photos.splice(_index, 1);
		};
	}
]);