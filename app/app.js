var ccApp = angular.module('ccApp', ['ui.router', 'ngAnimate']);

ccApp.config( ['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise("/");

		//State definitions
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "partials/home/home.html"
			})
			.state("countries", {
				url: "/countries",
				templateUrl: "partials/countries/list.html",
				controller: 'listController'
			})
			.state("countryDetail", {
				url: "/countries/:countryCode",
				templateUrl: "partials/country/detail.html",
				controller: 'detailController'
			});
	}]);

ccApp.controller('appCtrl', ['cncData', '$scope',
	function(cncData, $scope){
		//This controller instantiates cncData which causes the
		//initial GET of the countries data.
		$scope.version = cncData.version;
	}]);
ccApp.factory('cncData', ['ccLibraryService',
	function(ccLibraryService) {
		var Data = {};

		//Evaluate the getCountries function immediately.
		Data.countries = ccLibraryService.getCountries();

		//These other methods require parameters.
		Data.getCapital = ccLibraryService.getCapital;
		Data.getNeighbors = ccLibraryService.getNeighbors;

		return Data;
	}]);


ccApp.run( ['$rootScope', '$state', '$stateParams', '$location', '$timeout',
	function($rootScope, $state, $stateParams, $location, $timeout) {
		//This initialization function enables button hiding.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}]);


