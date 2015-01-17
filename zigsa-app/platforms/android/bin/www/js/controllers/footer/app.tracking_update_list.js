AppController.controller("AppFooterTrackingUpdateListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$scope.toggleEdit = function(_status) {
			$rootScope.onEdit = _status;
		};
		$scope.deleteAll = function() {
			AppSrv.deleteAllTrackingUpdate().then(function(){
				$rootScope.item.tracking_update_list = {};
				$rootScope.onEdit = false;
			});
		};
	}
]);