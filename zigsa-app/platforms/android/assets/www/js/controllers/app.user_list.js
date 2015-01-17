AppController.controller("AppUserListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	"$stateParams",
	function($scope, $rootScope, $state, AppSrv, $stateParams) {
		$rootScope.pageTitle = "User List";
		$rootScope.page = "user_list";

		AppSrv.getUserList($stateParams.id).then(function(data) {
			$rootScope.item.user_list = data;
		});

		$scope.newTracking = function(_id) {
			$rootScope.userId = _id;
			$state.go("app.new_tracking");
		};
	}
]);