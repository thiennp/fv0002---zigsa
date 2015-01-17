AppController.controller("AppHomeCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "The Zigsa Tracking";
		$rootScope.page = "home";
	}
]);