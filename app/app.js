angular.module( 'myApp', ['ccAppViews', 'ngRoute'] )
	.config( function ($routeProvider) {
		$routeProvider.otherwise( {
			redirectTo: '/'
		} );
	} )

	.run( ['$rootScope', '$location', '$routeParams', 'ccNavigationValue', function ($rootScope, $location, $routeParams, ccNavigationValue) {
		$rootScope.$on( '$routeChangeSuccess', function (e, current, pre) {
			//console.log( 'Current route name: ' + $location.path() );
			// Get all URL parameter
			//console.log( $routeParams );
			ccNavigationValue.current = $location.path();
		} )
	}] );