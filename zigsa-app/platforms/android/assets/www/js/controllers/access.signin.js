AppController.controller("SigninCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"$modal",
	"$log",
	"Auth",
	"$timeout",
	function($scope, $rootScope, $state, $modal, $log, Auth, $timeout) {
		$scope.user = Auth.getUser();

		if ($scope.user) {
			$state.go('access.splash');
		} else {
			$scope.user = {};
		}

		$scope.signIn = function() {
			Auth
				.authenticate($scope.user)
				.then(function() {
					$timeout(function() {
						$state.go('access.splash');
					}, 100);
					$timeout(function() {
						$rootScope.loading = false;
					}, 200);
				}, function(data) {
					if (data) {
						if (data) {
							console.log(data.message);
						}
					}
				});
		};
	}
]);