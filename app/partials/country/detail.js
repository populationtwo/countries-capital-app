viewsModule.config( function ($routeProvider) {
	$routeProvider.when( '/countries/:countryCode', {
		templateUrl: './partials/country/detail.html',
		controller : 'detailController'
	} )
} )

viewsModule.controller( 'detailController', function () {
	console.log( 'detail controller' )
} )

