angular.module( 'myApp', ['ccAppViews', 'ngRoute'] )
	.config( function ($routeProvider) {
		$routeProvider.otherwise( {
			redirectTo: '/'
		} )
	} )
