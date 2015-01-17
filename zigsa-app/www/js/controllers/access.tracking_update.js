AppController.controller("AccessTrackingUpdateCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.item = {};

		AccessSrv.getTrackingUpdate().then(function(data){
			$scope.item = data;
		});

		$scope.updateData = function() {
			AccessSrv.updateTrackingUpdate($scope.item).then(function(data){
			});
		};
	}
]);