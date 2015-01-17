AppController.controller("AppFooterPackageInfoCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$scope.save = function() {
			$rootScope.cancel = false;
			$rootScope.back();
		};

		$scope.cancel = function() {
			$rootScope.cancel = true;
			$rootScope.back();
		};
	}
]);