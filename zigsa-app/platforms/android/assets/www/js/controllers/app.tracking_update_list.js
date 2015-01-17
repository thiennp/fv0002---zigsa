AppController.controller("AppTrackingUpdateListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	"$modal",
	function($scope, $rootScope, $state, AppSrv, $modal) {
		$rootScope.pageTitle = "Tracking Update List";
		$rootScope.page = "tracking_update_list";

		AppSrv.getTrackingUpdateList().then(function(data) {
			$rootScope.item.tracking_update_list = data;
		});

		$scope.action = function(_id) {
			if ($rootScope.onEdit) {
				AppSrv.deleteTrackingUpdate(_id).then(function(data){
					$rootScope.item.tracking_update_list = data;
				});
			} else {
				$state.go("app.edit_tracking_update", {id: _id});
			}
		};

		$scope.uploadTrackingUpdateList = function(){
			$scope.uploadingTrackingUpdateList = true;
			waitingTrackingUpdateListPopup();
			AppSrv.uploadTrackingUpdateList().then(function(){
				$scope.uploadingTrackingUpdateList = false;
				$rootScope.waitingTrackingUpdateListCancel();
			});
		};

		$scope.emailTrackingUpdateList = function(){
			$scope.emailingTrackingUpdateList = true;
			waitingTrackingUpdateListPopup();
			AppSrv.emailTrackingUpdateList().then(function(){
				$scope.emailingTrackingUpdateList = false;
				$rootScope.waitingTrackingUpdateListCancel();
			});
		};
		
		var waitingTrackingUpdateListPopupCtrl = function ($scope, $modalInstance, items) {
			$rootScope.waitingTrackingUpdateListCancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		var waitingTrackingUpdateListPopup = function() {
			var modalInstance = $modal.open({
				templateUrl: 'tpl/waiting_popup.html',
				controller: waitingTrackingUpdateListPopupCtrl,
				resolve: {
					items: function () {
						return $scope.items;
					}
				},
				backdrop: 'static',
				keyboard: false
			});
		};
	}
]);