AppController.controller("AppTrackingListCtrl", [
	"$scope",
	"$rootScope",
	"$state",
	"AppSrv",
	"$modal",
	function($scope, $rootScope, $state, AppSrv, $modal) {
		$rootScope.pageTitle = "Tracking List";
		$rootScope.page = "tracking_list";

		AppSrv.getTrackingList().then(function(data) {
			$rootScope.item.tracking_list = data;
		});

		$scope.action = function(_id) {
			if ($rootScope.onEdit) {
				AppSrv.deleteTracking(_id).then(function(data) {
					$rootScope.item.tracking_list = data;
				});
			} else {
				$state.go("app.edit_tracking", {
					id: _id
				});
			}
		};

		$scope.uploadTrackingList = function(){
			$scope.uploadingTrackingList = true;
			waitingTrackingListPopup();
			AppSrv.uploadTrackingList().then(function(){
				$scope.uploadingTrackingList = false;
				$rootScope.waitingTrackingListCancel();
			});
		};

		$scope.emailTrackingList = function(){
			$scope.emailingTrackingList = true;
			waitingTrackingListPopup();
			AppSrv.emailTrackingList().then(function(){
				$scope.emailingTrackingList = false;
				$rootScope.waitingTrackingListCancel();
			});
		};
		
		var waitingTrackingListPopupCtrl = function ($scope, $modalInstance, items) {
			$rootScope.waitingTrackingListCancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		waitingTrackingListPopup = function() {
			var modalInstance = $modal.open({
				templateUrl: 'tpl/waiting_popup.html',
				controller: waitingTrackingListPopupCtrl,
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