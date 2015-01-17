AppServices.factory('AppSrv', [
	"$rootScope",
	"$http",
	"$q",
	"Auth",
	"Mocks",
	"$timeout",
	function($rootScope, $http, $q, Auth, Mocks, $timeout) {
		$rootScope.loading = true;
		var deferred = {};
		var setting = {};

		var getTrackingUpdateConfig = function() {
			if (localStorage.getItem("settingTrackingUpdate")) {
				setting = $rootScope.getLocal("settingTrackingUpdate");
			} else {
				setting = {
					"predefined_text": false,
					"location": false,
					"locate_me": false,
					"upload_pic": false,
					"signature": false,
					"print_label": false,
					"package_dimensions": false
				};
			}
			return setting;
		};

		var getNewTrackingConfig = function() {
			if (localStorage.getItem("settingNewTracking")) {
				setting = $rootScope.getLocal("settingNewTracking");
			} else {
				setting = {
					"carrier_tracking": false,
					"note": false,
					"location": false,
					"over_write": false,
					"upload_pic": false,
					"package_dimensions": false,
					"signature": false,
					"print_label": false
				};
			}
			return setting;
		};

		var getUserList = function(_search) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = Mocks.mockData({
				id: 'id',
				name: 'name'
			});

			if (_search == "0") {
				data = [];
			}
			
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'user/' + _search, {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("appUserList", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("appUserList");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		var getTrackingList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("appTrackingList");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'tracking', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("appTrackingList", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("appTrackingList");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		var getTrackingUpdateList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("appTrackingUpdateList");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'tracking_update', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("appTrackingUpdateList", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("appTrackingUpdateList");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		var getTracking = function(_id) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("appTrackingList");
			deferred[attr].resolve(data[_id]);
			// $http
			// 	.get($rootScope.apiServer + 'tracking/' + _id, {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("appTrackingList", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("appTrackingList");
			// 		deferred[attr].resolve(data[_id]);
			// 	});

			return deferred[attr].promise;
		};

		var getTrackingUpdate = function(_id) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("appTrackingUpdateList");
			deferred[attr].resolve(data[_id]);
			// $http
			// 	.get($rootScope.apiServer + 'tracking_update/' + _id, {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("appTrackingUpdateList", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("appTrackingUpdateList");
			// 		deferred[attr].resolve(data[_id]);
			// 	});

			return deferred[attr].promise;
		};

		var editTracking = function(_item, _edit) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var resolveData = function(_edit, _status) {
				if (_status == 401) {
					Auth.signOut();
				}
				var appTrackingList = $rootScope.getLocal("appTrackingList");
				if (_edit) {
					delete appTrackingList[_edit];
				}
				appTrackingList[_item.receipt] = _item;
				$rootScope.setLocal("appTrackingList", appTrackingList);
				deferred[attr].resolve(_item);
			};

			if (!_edit) {
				resolveData();
			} else {
				resolveData(_edit);
			}
			return deferred[attr].promise;
		};

		var editTrackingUpdate = function(_item, _edit) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var resolveData = function(_edit, status) {
				if (status == 401) {
					Auth.signOut();
				}
				var appTrackingUpdateList = $rootScope.getLocal("appTrackingUpdateList");
				if (_edit) {
					delete appTrackingUpdateList[_edit];
				}
				appTrackingUpdateList[_item.tracking_number] = _item;
				$rootScope.setLocal("appTrackingUpdateList", appTrackingUpdateList);
				deferred[attr].resolve(_item);
			};

			if (!_edit) {
				resolveData();
			} else {
				resolveData(_edit);
			}
			return deferred[attr].promise;
		};

		var deleteTracking = function(_id) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			var appTrackingList = $rootScope.getLocal("appTrackingList");
			delete appTrackingList[_id];
			$rootScope.setLocal("appTrackingList", appTrackingList);

			deferred[attr].resolve(appTrackingList);
			return deferred[attr].promise;
		};

		var deleteTrackingUpdate = function(_id) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			var appTrackingUpdateList = $rootScope.getLocal("appTrackingUpdateList");
			delete appTrackingUpdateList[_id];
			$rootScope.setLocal("appTrackingUpdateList", appTrackingUpdateList);

			deferred[attr].resolve(appTrackingUpdateList);
			return deferred[attr].promise;
		};

		var deleteAllTracking = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("appTrackingList");
			deferred[attr].resolve({});
			return deferred[attr].promise;
		};

		var deleteAllTrackingUpdate = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("appTrackingUpdateList");

			deferred[attr].resolve({});
			return deferred[attr].promise;
		};

		var uploadTrackingList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var _item = localStorage.getItem("appTrackingList");

			var resolveData = function(status) {
				if (status == 401) {
					Auth.signOut();
				}
				deferred[attr].resolve();
			};

			$timeout(resolveData, 2000);
			// $http
			// 	.put($rootScope.apiServer + 'upload_tracking_list/', _item)
			// 	.success(function(data, status) {
			// 		resolveData(status);
			// 	})
			// 	.error(function(data, status) {
			// 		resolveData(status);
			// 	});
			return deferred[attr].promise;
		};

		var uploadTrackingUpdateList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var _item = localStorage.getItem("appTrackingUpdateList");

			var resolveData = function(status) {
				if (status == 401) {
					Auth.signOut();
				}
				deferred[attr].resolve();
			};

			$timeout(resolveData, 2000);
			// $http
			// 	.put($rootScope.apiServer + 'upload_tracking_update_list/', _item)
			// 	.success(function(data, status) {
			// 		resolveData(status);
			// 	})
			// 	.error(function(data, status) {
			// 		resolveData(status);
			// 	});
			return deferred[attr].promise;
		};

		var emailTrackingList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var _item = localStorage.getItem("appTrackingList");

			var resolveData = function(status) {
				if (status == 401) {
					Auth.signOut();
				}
				deferred[attr].resolve();
			};

			$timeout(resolveData, 2000);
			// $http
			// 	.put($rootScope.apiServer + 'email_tracking_list/', _item)
			// 	.success(function(data, status) {
			// 		resolveData(status);
			// 	})
			// 	.error(function(data, status) {
			// 		resolveData(status);
			// 	});
			return deferred[attr].promise;
		};

		var emailTrackingUpdateList = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var _item = localStorage.getItem("appTrackingUpdateList");

			var resolveData = function(status) {
				if (status == 401) {
					Auth.signOut();
				}
				deferred[attr].resolve();
			};
			$timeout(resolveData, 2000);
			// $http
			// 	.put($rootScope.apiServer + 'email_tracking_update_list/', _item)
			// 	.success(function(data, status) {
			// 		resolveData(status);
			// 	})
			// 	.error(function(data, status) {
			// 		resolveData(status);
			// 	});
			return deferred[attr].promise;
		};

		var getAddress = function() {
			return $rootScope.getLocal("appAddress").result;
		};

		var getLocation = function() {
			return $rootScope.getLocal("appLocation").result;
		};

		var getPredefineText = function() {
			return $rootScope.getLocal("appPredifineText").result;
		};

		return {
			getTrackingUpdateConfig: getTrackingUpdateConfig,
			getNewTrackingConfig: getNewTrackingConfig,
			getUserList: getUserList,
			getTrackingList: getTrackingList,
			getTrackingUpdateList: getTrackingUpdateList,
			getTracking: getTracking,
			getTrackingUpdate: getTrackingUpdate,
			editTracking: editTracking,
			editTrackingUpdate: editTrackingUpdate,
			deleteTracking: deleteTracking,
			deleteTrackingUpdate: deleteTrackingUpdate,
			deleteAllTracking: deleteAllTracking,
			deleteAllTrackingUpdate: deleteAllTrackingUpdate,
			getLocation: getLocation,
			getAddress: getAddress,
			getPredefineText: getPredefineText,
			uploadTrackingList: uploadTrackingList,
			uploadTrackingUpdateList: uploadTrackingUpdateList,
			emailTrackingList: emailTrackingList,
			emailTrackingUpdateList: emailTrackingUpdateList
		};
	}
]);