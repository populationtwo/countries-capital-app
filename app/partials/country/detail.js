viewsModule.config( function ($routeProvider) {
	$routeProvider.when( '/countries/:country', {
		templateUrl: './partials/country/detail.html',
		controller : 'detailController'
	} )
} )

viewsModule.controller( 'detailController', function ($scope, $routeParams, ccCapitalReq,ccCountries, ccCapPopulation, ccNeighborsReq, ccNeighbors) {
	ccCountries.getCcDetails( $routeParams.country ).then( function (data) {

		$scope.country = data;
		ccCapitalReq(data.countryCode, data.countryName).then(function(data){
			$scope.country.capital_pop = ccCapPopulation(data);
		});
		ccNeighborsReq(data.geonameId).then(function(ndata){
			$scope.country.neighbors = ccNeighbors(ndata);
		});
	} )


} )

