AppServices.factory('Auth', function($http, $q, $state, $rootScope, $timeout) {

    var getUser = function() {
        var $ret = null;
        if (localStorage.getItem('user')) {
            if (angular.fromJson(localStorage.getItem('user'))) {
                $ret = angular.fromJson(localStorage.getItem('user'));
            }
        }
        return $ret;
    };

    var signOut = function() {
        if (localStorage.getItem('authToken')) {
            $http
                .get($rootScope.apiServer + 'auth/clear', {})
                .success(function(data) {})
                .error(function(data) {});
        }
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        $state.go('access.signin');
        $rootScope.loading = false;
    };

    var getAuthToken = function() {
        return localStorage.getItem('authToken');
    };

    var setAuthToken = function(token) {
        localStorage.setItem('authToken', token);
    };

    var isAuthenticated = function() {
        return !!getUser();
    };

    var retriveUser = function() {
        return $http.get($rootScope.apiServer + 'users/me').error(function() {
            signOut();
        });
    };

    var setHttpHeader = function() {
        $http.defaults.headers.common['auth-token'] = getAuthToken();
    };

    var authenticate = function(_user) {
        var deferred = $q.defer();
        /*$rootScope.loading = true;
		$http
			.post($rootScope.apiServer+'auth/token', {
				email: _user.email,
				password: _user.password
			})
			.success(function(data) {
				setAuthToken(data.auth_token);
				setHttpHeader();

				retriveUser().then(function(data) {
					localStorage.setItem('user', JSON.stringify(data.data[0]));
					deferred.resolve();
					$rootScope.me = data.data[0];
				}, deferred.reject);
			})
			.error(function(data) {
				$rootScope.loading = false;
				deferred.reject();
			});*/

        return deferred.promise;
    };

    var validateUser = function() {
        // if (getAuthToken()) {
        // 	var deferred = $q.defer();
        // 	$rootScope.loading = true;
        // 	$http
        // 		.get($rootScope.apiServer+'auth/check', {})
        // 		.success(function(data, status) {
        // 			if (!data.authenticated) {
        // 				signOut();
        // 			} else {
        // 				$rootScope.me = getUser();
        // 			}
        // 			$rootScope.loading = false;
        // 		})
        // 		.error(function(data) {
        // 			signOut();
        // 			$rootScope.loading = false;
        // 		});
        // } else {
        // 	signOut();
        // 	$rootScope.loading = false;
        // }
    };

    $http.defaults.headers.common['auth-token'] = getAuthToken();

    setHttpHeader();

    return {
        getUser: getUser,
        getAuthToken: getAuthToken,
        isAuthenticated: isAuthenticated,
        authenticate: authenticate,
        validateUser: validateUser,
        signOut: signOut
    };
});