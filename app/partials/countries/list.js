viewsModule.config( function ($routeProvider) {
	$routeProvider.when( '/countries', {
		templateUrl: './partials/countries/list.html',
		controller : 'listController'
	} )
} )

viewsModule.controller( 'listController', function ($scope, $rootScope, $location, ccCountries) {

	var list = $scope;

	$rootScope.isLoading = true;
	ccCountries.getCcList().then( function (data) {
		list.countries = data.data.geonames;
		$rootScope.isLoading = false;
	} );

} )