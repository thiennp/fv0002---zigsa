AppController.controller("AccessNewTrackingCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AccessSrv",
	function($scope, $rootScope, $state, AccessSrv) {
		$scope.item = {};

		AccessSrv.getNewTracking().then(function(data){
			$scope.item = data;
			$('.sigPad').signaturePad({drawOnly:true});
		});

		$scope.updateData = function() {
			AccessSrv.updateNewTracking($scope.item).then(function(data){
			});
		};
	}
]);