AppController.controller("AccessSplashCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.checking = true;
		AccessSrv.getAccount().then(function(data) {
			if (data.user) {
				$scope.hasAccount = true;
				$scope.checking = false;
			} else {
				$scope.hasAccount = false;
				$scope.checking = false;
			}
		});
	}
]);