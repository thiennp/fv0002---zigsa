AppController.controller("AccessAboutCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.item = {};

		AccessSrv.getAbout().then(function(data){
			$scope.item = data;
		});
	}
]);