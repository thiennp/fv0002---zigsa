AppController.controller("AppTrackingListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Tracking List";
		$rootScope.page = "tracking_list";

		AppSrv.getTrackingList().then(function(data) {
			$rootScope.item.tracking_list = data;
		});

		$scope.action = function(_id) {
			if ($rootScope.onEdit) {
				AppSrv.deleteTracking(_id).then(function(data) {
					$rootScope.item.tracking_list = data;
				});
			} else {
				$state.go("app.edit_tracking", {
					id: _id
				});
			}
		};
	}
]);