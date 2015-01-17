AppController.controller("AppTrackingUpdateListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Tracking Update List";
		$rootScope.page = "tracking_update_list";

		AppSrv.getTrackingUpdateList().then(function(data) {
			$rootScope.item.tracking_update_list = data;
		});

		$scope.action = function(_id) {
			if ($rootScope.onEdit) {
				AppSrv.deleteTrackingUpdate(_id).then(function(data){
					$rootScope.item.tracking_update_list = data;
				});
			} else {
				$state.go("app.edit_tracking_update", {id: _id});
			}
		};
	}
]);