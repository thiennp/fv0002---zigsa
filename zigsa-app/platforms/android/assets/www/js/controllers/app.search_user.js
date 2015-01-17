AppController.controller("AppSearchUserCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"$stateParams",
	"AppSrv",
	function($scope, $rootScope, $state, $stateParams, AppSrv) {
		$rootScope.pageTitle = "Search User";
		$rootScope.page = "search_user";
		$rootScope.searchUser = "";
		$scope.updateSearch = function() {
			$rootScope.noUserFound = false;
			$rootScope.searchUser = $scope.search;
		};
	}
]);