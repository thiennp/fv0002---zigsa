AppController.controller("AccessAccountCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.item = {};

		AccessSrv.getAccount().then(function(data) {
			$scope.item = data;
			if (!$scope.item.language) {
				$scope.item.language = "English";
			}
		});

		$scope.updateData = function() {
			AccessSrv.updateAccount($scope.item).then(function(data) {});
		};
	}
]);