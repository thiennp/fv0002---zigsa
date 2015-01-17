AppServices.factory('AccessSrv', [
	"$rootScope",
	"$http",
	"$q",
	"Auth",
	"Mocks",
	function($rootScope, $http, $q, Auth, Mock) {
		$rootScope.loading = true;
		var deferred = {};

		var getAccount = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("settingAccount");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'account', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingAccount", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingAccount");
			// 		deferred[attr].resolve(data);
			// 	});

			return deferred[attr].promise;
		};

		var updateAccount = function(_account) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("settingAccount", _account);

			deferred[attr].resolve({});
			// $http
			// 	.put($rootScope.apiServer + 'account', _account)
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	})
			// 	.error(function(data) {
			// 		deferred[attr].resolve({});
			// 	});
			return deferred[attr].promise;
		};

		var getLanguage = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = localStorage.getItem("settingLanguage");
			deferred[attr].resolve(data);
			Auth.validateUser();
			// $http
			// 	.get($rootScope.apiServer + 'language', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingLanguage", data);

			// 		var settingAccount = JSON.parse(localStorage.getItem("settingAccount"));
			// 		settingAccount.language = $rootScope.languageName[data.language];
			// 		$rootScope.setLocal("settingAccount", settingAccount);

			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingLanguage");
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	});
			return deferred[attr].promise;
		};

		var updateLanguage = function(_language) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			localStorage.setItem("settingLanguage", _language);

			var settingAccount = JSON.parse(localStorage.getItem("settingAccount"));
			settingAccount.language = $rootScope.languageName[_language];
			$rootScope.setLocal("settingAccount", settingAccount);

			deferred[attr].resolve({});
			// $http
			// 	.put($rootScope.apiServer + 'language', _language)
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	})
			// 	.error(function(data) {
			// 		deferred[attr].resolve({});
			// 	});
			return deferred[attr].promise;
		};

		var getConfig = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("settingConfig");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'config', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingConfig", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingConfig");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		var updateConfig = function(_config) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("settingConfig", _config);

			deferred[attr].resolve({});
			// $http
			// 	.put($rootScope.apiServer + 'config', _config)
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	})
			// 	.error(function(data) {
			// 		deferred[attr].resolve({});
			// 	});
			return deferred[attr].promise;
		};

		var getNewTracking = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("settingNewTracking");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'new_tracking', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingNewTracking", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingNewTracking");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};


		var updateNewTracking = function(_new_tracking) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("settingNewTracking", _new_tracking);

			deferred[attr].resolve({});
			// $http
			// 	.put($rootScope.apiServer + 'new_tracking', _new_tracking)
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	})
			// 	.error(function(data) {
			// 		deferred[attr].resolve({});
			// 	});
			return deferred[attr].promise;
		};

		var getTrackingUpdate = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("settingTrackingUpdate");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'tracking_update', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingTrackingUpdate", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingTrackingUpdate");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		var updateTrackingUpdate = function(_tracking_update) {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();
			$rootScope.setLocal("settingTrackingUpdate", _tracking_update);

			deferred[attr].resolve({});
			// $http
			// 	.put($rootScope.apiServer + 'tracking_update', _tracking_update)
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		deferred[attr].resolve(data);
			// 		Auth.validateUser();
			// 	})
			// 	.error(function(data) {
			// 		deferred[attr].resolve({});
			// 	});
			return deferred[attr].promise;
		};

		var getAbout = function() {
			var attr = "item" + Math.random();
			deferred[attr] = $q.defer();

			var data = $rootScope.getLocal("settingAbout");
			deferred[attr].resolve(data);
			// $http
			// 	.get($rootScope.apiServer + 'about', {})
			// 	.success(function(data, status) {
			// 		if (status == 401) {
			// 			Auth.signOut();
			// 		}
			// 		$rootScope.setLocal("settingAbout", data);
			// 		deferred[attr].resolve(data);
			// 	})
			// 	.error(function(data) {
			// 		data = $rootScope.getLocal("settingAbout");
			// 		deferred[attr].resolve(data);
			// 	});
			return deferred[attr].promise;
		};

		return {
			getAccount: getAccount,
			updateAccount: updateAccount,
			getLanguage: getLanguage,
			updateLanguage: updateLanguage,
			getConfig: getConfig,
			updateConfig: updateConfig,
			getNewTracking: getNewTracking,
			updateNewTracking: updateNewTracking,
			getTrackingUpdate: getTrackingUpdate,
			updateTrackingUpdate: updateTrackingUpdate,
			getAbout: getAbout
		};
	}
]);