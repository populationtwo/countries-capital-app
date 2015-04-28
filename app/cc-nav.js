angular.module( 'ccNavigation', [] )

	.value( 'ccNavigationValue', {
		current: null
	} )

	.controller( 'navController', ['$scope', 'ccNavigationValue', function ($scope, ccNavigationValue) {
		$scope.nav = ccNavigationValue;
	}] )