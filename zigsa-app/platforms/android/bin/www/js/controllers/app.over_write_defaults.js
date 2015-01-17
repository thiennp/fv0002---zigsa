AppController.controller("AppOverWriteDefaultsCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.pageTitle = "Over Write Defaults";
		$rootScope.page = "over_write_defaults";
        $rootScope.from_detail = true;

        $scope.addresses = AppSrv.getAddress();
        $scope.locations = AppSrv.getLocation();
        $scope.predefineText = AppSrv.getPredefineText();

        $scope.updateComment = function() {
            $rootScope.over_write.comment = $scope.comment_predefined_text;
        };

        $scope.updateAddress = function() {
            $rootScope.over_write.address = $scope.address_location;
        };
	}
]);