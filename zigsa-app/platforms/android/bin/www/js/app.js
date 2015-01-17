'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
		'ngAnimate',
		'ngCookies',
		'ngStorage',

		'bigBackground.directive',
		'mainloading.directive',

		'ui.router',
		'ui.bootstrap',
		'ui.load',
		'ui.jq',
		'ui.validate',
		'pascalprecht.translate',
		'app.filters',
		'app.services',
		'app.directives',
		'app.controllers'
	])
	.run(
		['$rootScope', '$state', '$stateParams', 'Auth', '$http', 
			function($rootScope, $state, $stateParams, Auth, $http) {
				$rootScope.version = "0.0.1";
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
				$rootScope.apiServer = "http://www.zcorpion.com/api/";
				$rootScope.itemPerPage = 10;
				$rootScope.over_write = {};
				$rootScope.last_over_write = {};
				$rootScope.package_dimentions = {};
				$rootScope.last_package_dimentions = {};
				$rootScope.languageName = {
					"en": "English",
					"es": "Espanol",
					"po": "Portuguese"
				};
				$rootScope.item = {};
				$rootScope.navigationMap = [];
				localStorage.setItem("navigationMap", "");

				$rootScope.$on('$locationChangeSuccess', function(evt) {
					Auth.validateUser();
				});

				$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
					// to be used for back button //won't work when page is reloaded.
					if (!$rootScope.isBacked) {
						if (!fromParams.id) {
							fromParams.id = "";
						}
						if (fromState.name) {
							$rootScope.navigationMap.push(fromState.name + ',' + fromParams.id);
						}
					} else {
						$rootScope.isBacked = false;
						$rootScope.navigationMap.splice(-1, 1);
					}
					localStorage.setItem("navigationMap", $rootScope.navigationMap.join(":"));
					if ($('.row-offcanvas').length > 0) {
						if ($('.row-offcanvas').hasClass('active')) {
							$('.row-offcanvas').removeClass('active').addClass('inactive');
						}
					}
					$rootScope.onEdit = false;
				});

				//back button function called from back button's ng-click="back()"
				$rootScope.back = function() {
					$rootScope.isBacked = true;
					var navLength = $rootScope.navigationMap.length;
					if ($rootScope.navigationMap.length < 1) {
						$state.go('access.splash');
					} else {
						var lastState = $rootScope.navigationMap[navLength - 1].split(",");
						$state.go(lastState[0], {
							"id": lastState[1]
						});
					}
				};

				$rootScope.toggleMenu = function() {
					$('.row-offcanvas').toggleClass('active');
					if ($('.row-offcanvas').hasClass('active')) {
						$('.row-offcanvas').removeClass('inactive');
					} else {
						$('.row-offcanvas').addClass('inactive');
					}
				};

				$rootScope.getLocal = function(dataName) {
					if (localStorage.getItem(dataName)) {
						return JSON.parse(localStorage.getItem(dataName));
					} else {
						return {};
					}
				};

				$rootScope.setLocal = function(dataName, data) {
					if (data) {
						localStorage.setItem(dataName, JSON.stringify(data));
					} else {
						localStorage.removeItem(dataName);
					}
				};

				$rootScope.getGlobalConfig = function() {
					if (localStorage.getItem("settingConfig")) {
						$rootScope.config = $rootScope.getLocal("settingConfig");
					} else {
						$rootScope.config = {
							"new_tracking": false,
							"tracking_update": false,
							"search": false,
							"fast_receiving": false,
							"tracking_stats": false,
							"mass_update": false,
							"tracking_location": false,
							"rfid": false,
							"barcode_scanner": false
						};
					}
				};
				
				var getLocation = function() {
					// Mock data
					var allLocations = {
						"respond": 1,
						"paging": {
							"stillmore": 0,
							"perpage": 0,
							"callpage": 0,
							"next": 0,
							"previous": 0,
							"pages": 0,
							"result": 0
						},
						"message": "",
						"result": [{
							"id": "675",
							"name": "Alertado",
							"slug": "alertado",
							"description": "",
							"count": "0",
							"parent": "0",
							"image": "Plugin Categories Images must be enabled",
							"subcategory": []
						}, {
							"id": "733",
							"name": "in",
							"slug": "in",
							"description": "Ubicaci\u00f3n del paquete al recibirlo en el almacen (en la jaula)",
							"count": "0",
							"parent": "0",
							"image": "Plugin Categories Images must be enabled",
							"subcategory": []
						}, {
							"id": "734",
							"name": "out",
							"slug": "out",
							"description": "Paquete salio de almacen, bien sea alguien lo recojio o se fue en un embarque",
							"count": "1",
							"parent": "0",
							"image": "Plugin Categories Images must be enabled",
							"subcategory": []
						}]
					};
					$rootScope.setLocal("appLocation", allLocations);

					/*var data = $rootScope.getLocal("appLocation");
					$http
						.get($rootScope.apiServer + 'get_taxonomy/?taxonomy_name=location', {})
						.success(function(data) {
							$rootScope.setLocal("appLocation", data);
						})
						.error(function(data) {
							data = $rootScope.getLocal("appLocation");
						});*/
				};

				var getAddress = function() {
					// Mock data
					var allAddresses = {
						"respond": 1,
						"paging": {
							"stillmore": 0,
							"perpage": 10,
							"callpage": 1,
							"next": 2,
							"previous": 0,
							"pages": 1,
							"result": "4"
						},
						"message": "",
						"result": [{
							"id": "1",
							"name": "Oficina Miami",
							"location": "Doral,Fl 33166",
							"lat": "25.835285",
							"lng": "-80.332756",
							"setdefault": "0"
						}, {
							"id": "2",
							"name": "Caracas",
							"location": "Doral,Fl 33166",
							"lat": "25.835285",
							"lng": "-80.332756",
							"setdefault": "1"
						}, {
							"id": "3",
							"name": "Valencia",
							"location": "Valencia, Vzla",
							"lat": "10.174127",
							"lng": "-67.999817",
							"setdefault": "0"
						}, {
							"id": "4",
							"name": "Barquisimeto",
							"location": "Barquisimeto, Vzla.",
							"lat": "10.063611",
							"lng": "-69.334724",
							"setdefault": "0"
						}]
					};
					$rootScope.setLocal("appAddress", allAddresses);

					var data = $rootScope.getLocal("appAddress");
					// $http
					// 	.get($rootScope.apiServer + 'custom_service/?service=getaddress', {})
					// 	.success(function(data) {
					// 		$rootScope.setLocal("appAddress", data);
					// 	})
					// 	.error(function(data) {
					// 		data = $rootScope.getLocal("appAddress");
					// 	});
				};

				var getPredefineText = function() {
					// Mock data
					var predefineText = {
						"respond": 1,
						"paging": {
							"stillmore": 0,
							"perpage": 10,
							"callpage": 1,
							"next": 2,
							"previous": 0,
							"pages": 1,
							"result": "10"
						},
						"message": "",
						"result": [{
							"id": "12",
							"name": "En Aduana",
							"pre_define_text": "En Aduana",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "699"
						}, {
							"id": "13",
							"name": "En transito",
							"pre_define_text": "En Transito",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "673"
						}, {
							"id": "14",
							"name": "Entregado",
							"pre_define_text": "Entregado a:",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "727"
						}, {
							"id": "15",
							"name": "Falta pago",
							"pre_define_text": "Falta pago",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "674"
						}, {
							"id": "16",
							"name": "Recogido",
							"pre_define_text": "Recogido",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "676"
						}, {
							"id": "17",
							"name": "Nadie para recibir",
							"pre_define_text": "Nadie para recibir",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "736"
						}, {
							"id": "18",
							"name": "Entregan Hoy",
							"pre_define_text": "Entregan Hoy",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "738"
						}, {
							"id": "10",
							"name": "Recibido",
							"pre_define_text": "Recibido",
							"status": "1",
							"setdefault": "1",
							"icon": "zcorpion-icon.png",
							"steps": "700"
						}, {
							"id": "11",
							"name": "Alertado",
							"pre_define_text": "Alertado",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "675"
						}, {
							"id": "19",
							"name": "En proceso",
							"pre_define_text": "En proceso",
							"status": "1",
							"setdefault": "0",
							"icon": "zcorpion-icon.png",
							"steps": "740"
						}]
					};
					$rootScope.setLocal("appPredifineText", predefineText);

					var data = $rootScope.getLocal("appPredifineText");
					// $http
					// 	.get($rootScope.apiServer + 'custom_service/?service=getpredifinetext', {})
					// 	.success(function(data) {
					// 		$rootScope.setLocal("appPredifineText", data);
					// 	})
					// 	.error(function(data) {
					// 		data = $rootScope.getLocal("appPredifineText");
					// 	});
				};

				$rootScope.getGlobalConfig();
				getLocation();
				getAddress();
				getPredefineText();
				$state.go("access.splash");
			}
		]
	)
	.config(
		['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
			function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

				// lazy controller, directive and service
				app.controller = $controllerProvider.register;
				app.directive = $compileProvider.directive;
				app.filter = $filterProvider.register;
				app.factory = $provide.factory;
				app.service = $provide.service;
				app.constant = $provide.constant;
				app.value = $provide.value;

				$urlRouterProvider
					.otherwise('/access/splash');
				$stateProvider
					.state('access', {
						url: '/access',
						template: '<div ui-view class="fade-in-right-big smooth bg-light" style="height: 100%"></div>'
					})
					.state('access.splash', {
						url: '/splash',
						templateUrl: 'tpl/access.splash.html',
						controller: 'AccessSplashCtrl'
					})
					.state('access.account', {
						url: '/account',
						templateUrl: 'tpl/access.account.html',
						controller: 'AccessAccountCtrl'
					})
					.state('access.language', {
						url: '/language',
						templateUrl: 'tpl/access.language.html',
						controller: 'AccessLanguageCtrl'
					})
					.state('access.config', {
						url: '/config',
						templateUrl: 'tpl/access.config.html',
						controller: 'AccessConfigCtrl'
					})
					.state('access.new_tracking', {
						url: '/new_tracking',
						templateUrl: 'tpl/access.new_tracking.html',
						controller: 'AccessNewTrackingCtrl'
					})
					.state('access.tracking_update', {
						url: '/tracking_update',
						templateUrl: 'tpl/access.tracking_update.html',
						controller: 'AccessTrackingUpdateCtrl'
					})
					.state('access.about', {
						url: '/about',
						templateUrl: 'tpl/access.about.html',
						controller: 'AccessAccountCtrl'
					})
					.state('app', {
						abstract: true,
						url: '/app',
						templateUrl: 'tpl/app.html'
					})
					.state('app.home', {
						url: '/home',
						views: {
							body: {
								templateUrl: 'tpl/app.home.html',
								controller: 'AppHomeCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.home.html',
								controller: 'AppHomeCtrl'
							}
						}
					})
					.state('app.tracking_list', {
						url: '/tracking_list',
						views: {
							body: {
								templateUrl: 'tpl/app.tracking_list.html',
								controller: 'AppTrackingListCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.tracking_list.html',
								controller: 'AppFooterTrackingListCtrl'
							}
						}
					})
					.state('app.new_tracking', {
						url: '/new_tracking',
						views: {
							body: {
								templateUrl: 'tpl/app.new_tracking.html',
								controller: 'AppNewTrackingCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.new_tracking.html',
								controller: 'AppFooterNewTrackingCtrl'
							}
						}
					})
					.state('app.edit_tracking', {
						url: '/edit_tracking/:id',
						views: {
							body: {
								templateUrl: 'tpl/app.new_tracking.html',
								controller: 'AppNewTrackingCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.new_tracking.html',
								controller: 'AppFooterNewTrackingCtrl'
							}
						}
					})
					.state('app.tracking_update_list', {
						url: '/tracking_update_list',
						views: {
							body: {
								templateUrl: 'tpl/app.tracking_update_list.html',
								controller: 'AppTrackingUpdateListCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.tracking_update_list.html',
								controller: 'AppFooterTrackingUpdateListCtrl'
							}
						}
					})
					.state('app.tracking_update', {
						url: '/tracking_update',
						views: {
							body: {
								templateUrl: 'tpl/app.tracking_update.html',
								controller: 'AppTrackingUpdateCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.tracking_update.html',
								controller: 'AppFooterTrackingUpdateCtrl'
							}
						}
					})
					.state('app.edit_tracking_update', {
						url: '/edit_tracking_update/:id',
						views: {
							body: {
								templateUrl: 'tpl/app.tracking_update.html',
								controller: 'AppTrackingUpdateCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.tracking_update.html',
								controller: 'AppFooterTrackingUpdateCtrl'
							}
						}
					})
					.state('app.over_write_defaults', {
						url: '/over_write_defaults',
						views: {
							body: {
								templateUrl: 'tpl/app.over_write_defaults.html',
								controller: 'AppOverWriteDefaultsCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.over_write_defaults.html',
								controller: 'AppFooterOverWriteDefaultsCtrl'
							}
						}
					})
					.state('app.package_info', {
						url: '/package_info',
						views: {
							body: {
								templateUrl: 'tpl/app.package_info.html',
								controller: 'AppPackageInfoCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.package_info.html',
								controller: 'AppFooterPackageInfoCtrl'
							}
						}
					})
					.state('app.signature', {
						url: '/signature',
						views: {
							body: {
								templateUrl: 'tpl/app.signature.html',
								controller: 'AppSignatureCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.signature.html',
								controller: 'AppFooterSignatureCtrl'
							}
						}
					})
					.state('app.search_user', {
						url: '/search_user',
						views: {
							body: {
								templateUrl: 'tpl/app.search_user.html',
								controller: 'AppSearchUserCtrl'
							},
							footer: {
								templateUrl: 'tpl/footer/app.search_user.html',
								controller: 'AppFooterSearchUserCtrl'
							}
						}
					})
					.state('app.user_list', {
						url: '/user_list/:id',
						views: {
							body: {
								templateUrl: 'tpl/app.user_list.html',
								controller: 'AppUserListCtrl'
							}
						}
					});
			}
		]
	)

.config(['$translateProvider',
	function($translateProvider) {

		// Register a loader for the static files
		// So, the module will search missing translation tables under the specified urls.
		// Those urls are [prefix][langKey][suffix].
		$translateProvider.useStaticFilesLoader({
			prefix: 'l10n/',
			suffix: '.json'
		});

		// Tell the module what language to use by default
		$translateProvider.preferredLanguage('en');

		// Tell the module to store the language in the local storage
		$translateProvider.useLocalStorage();

	}
])

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
	easyPieChart: ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
	sparkline: ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
	plot: ['js/jquery/charts/flot/jquery.flot.min.js',
		'js/jquery/charts/flot/jquery.flot.resize.js',
		'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
		'js/jquery/charts/flot/jquery.flot.spline.js',
		'js/jquery/charts/flot/jquery.flot.orderBars.js',
		'js/jquery/charts/flot/jquery.flot.pie.min.js'
	],
	slimScroll: ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
	sortable: ['js/jquery/sortable/jquery.sortable.js'],
	nestable: ['js/jquery/nestable/jquery.nestable.js',
		'js/jquery/nestable/nestable.css'
	],
	filestyle: ['js/jquery/file/bootstrap-filestyle.min.js'],
	slider: ['js/jquery/slider/bootstrap-slider.js',
		'js/jquery/slider/slider.css'
	],
	chosen: ['js/jquery/chosen/chosen.jquery.min.js',
		'js/jquery/chosen/chosen.css'
	],
	TouchSpin: ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
		'js/jquery/spinner/jquery.bootstrap-touchspin.css'
	],
	wysiwyg: ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
		'js/jquery/wysiwyg/jquery.hotkeys.js'
	],
	dataTable: ['js/jquery/datatables/jquery.dataTables.min.js',
		'js/jquery/datatables/dataTables.bootstrap.js',
		'js/jquery/datatables/dataTables.bootstrap.css'
	],
	vectorMap: ['js/jquery/jvectormap/jquery-jvectormap.min.js',
		'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
		'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
		'js/jquery/jvectormap/jquery-jvectormap.css'
	],
	footable: ['js/jquery/footable/footable.all.min.js',
		'js/jquery/footable/footable.core.css'
	]
})


.constant('MODULE_CONFIG', {
	select2: ['js/jquery/select2/select2.css',
		'js/jquery/select2/select2-bootstrap.css',
		'js/jquery/select2/select2.min.js',
		'js/modules/ui-select2.js'
	]
});