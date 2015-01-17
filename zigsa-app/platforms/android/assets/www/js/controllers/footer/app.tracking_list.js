AppController.controller("AppFooterTrackingListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$scope.toggleEdit = function(_status) {
			$rootScope.onEdit = _status;
		};
		$scope.deleteAll = function() {
			AppSrv.deleteAllTracking().then(function(){
				$rootScope.item.tracking_list = {};
				$rootScope.onEdit = false;
			});
		};
	}
]);