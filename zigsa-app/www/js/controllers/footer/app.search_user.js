AppController.controller("AppFooterSearchUserCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	function($scope, $rootScope, $state, AppSrv) {
		$rootScope.noUserFound = false;
		$scope.search = function() {
			AppSrv.getUserList($rootScope.searchUser).then(function(data) {
				$rootScope.item.user_list = data;
				if ($rootScope.item.user_list.length > 0) {
					$state.go("app.user_list");
				} else {
					$rootScope.noUserFound = true;
				}
			});
		};
	}
]);