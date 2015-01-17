AppController.controller("AccessLanguageCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.language = "en";

		AccessSrv.getLanguage().then(function(data) {
			$scope.language = data;
		});

		$scope.updateData = function() {
			AccessSrv.updateLanguage($scope.language).then(function(data) {});
		};
	}
]);