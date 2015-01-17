AppController.controller("AppPackageInfoCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Package Info";
		$rootScope.page = "package_info";
		$rootScope.from_detail = true;

		$scope.scanWidth = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.package_dimentions.width = Number(result.text);
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.scanHeight = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.package_dimentions.height = Number(result.text);
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.scanLength = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.package_dimentions.length = Number(result.text);
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};

		$scope.scanWeight = function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					$rootScope.package_dimentions.weight = Number(result.text);
					$rootScope.$apply();
				},
				function(error) {
					alert("Scanning failed: " + error);
				}
			);
		};
	}
]);