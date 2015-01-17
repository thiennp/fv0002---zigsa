AppController.controller("AppFooterTrackingUpdateCtrl", [
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

		$scope.updateNumber = function() {
			$rootScope.numberUpdated = true;
		};

        $scope.save = function() {
            AppSrv.editTrackingUpdate($rootScope.item.tracking_update, $edit).then(function(data) {
				$rootScope.over_write = {};
				$rootScope.package_dimentions = {};
                $state.go("app.tracking_update_list");
            });
        };
	}
]);