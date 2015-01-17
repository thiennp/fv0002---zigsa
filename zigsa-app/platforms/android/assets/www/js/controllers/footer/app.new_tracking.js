AppController.controller("AppFooterNewTrackingCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"$stateParams",
	"AppSrv",
	function($scope, $rootScope, $state, $stateParams, AppSrv) {
		var $edit = false;
		if ($stateParams.id) {
			$edit = $stateParams.id;
		}

		$scope.save = function() {
			AppSrv.editTracking($rootScope.item.new_tracking, $edit).then(function(data) {
				$state.go("app.tracking_list");
			});
		};

		$scope.addmore = function() {
			AppSrv.editTracking($rootScope.item.new_tracking, $edit).then(function(data) {
				$rootScope.over_write = {};
				$rootScope.package_dimentions = {};
				$state.go("app.search_user");
				$rootScope.item.new_tracking = {};
			});
		};
	}
]);