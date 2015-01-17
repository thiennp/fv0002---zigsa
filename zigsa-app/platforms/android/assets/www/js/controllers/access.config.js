AppController.controller("AccessConfigCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.item = {};

		AccessSrv.getConfig().then(function(data){
			$scope.item = data;
		});

		$scope.updateData = function() {
			AccessSrv.updateConfig($scope.item).then(function(data){
				$rootScope.getGlobalConfig();
			});
		};
	}
]);