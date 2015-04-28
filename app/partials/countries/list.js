viewsModule.config( function ($routeProvider) {
	$routeProvider
		.when( '/countries', {
			templateUrl: './partials/countries/list.html',
			controller : 'listController'
		} )
} )

viewsModule.controller('listController', function($scope, $rootScope, $location, ccCountries){

	var view = $scope;

	$rootScope.isLoading = true;
	ccCountries.getCcList().then(function(data){
		view.countries = data.data.geonames;
		$rootScope.isLoading = false;
	});

	view.setSelected = function(){
		$location.path('/countries/' + this.country.countryCode);
	};
})