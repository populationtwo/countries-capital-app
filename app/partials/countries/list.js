viewsModule.config( function ($routeProvider) {
	$routeProvider
		.when( '/countries', {
			templateUrl: './partials/countries/list.html',
			controller : 'listController'
		} )
} )

viewsModule.controller('listController', function(){

	console.log('list controller')
})