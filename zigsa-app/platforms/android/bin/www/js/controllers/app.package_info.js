AppController.controller("AppPackageInfoCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Package Info";
		$rootScope.page = "package_info";
		$rootScope.from_detail = true;
	}
]);