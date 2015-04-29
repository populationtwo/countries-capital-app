viewsModule.config( function ($routeProvider) {
	$routeProvider.when( '/countries', {
		templateUrl: './partials/countries/list.html',
		controller : 'listController'
	} )
} )

viewsModule.controller( 'listController', function ($scope, $rootScope, $location, ccCountries) {

	$rootScope.isLoading = true;
	ccCountries.getCcList().then( function (data) {
		$scope.countries = data.data.geonames;
		$rootScope.isLoading = false;
	} );

	$scope.getDetails = function(){
		$location.path('/countries/' + this.country.countryCode);
	}

} )

