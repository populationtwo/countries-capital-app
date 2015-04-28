angular.module( 'myApp', ['ngRoute'] )
	.config( function ($routeProvider) {
		$routeProvider.when( '/', {
			templateUrl: './partials/home/home.html'
		} ).when( '/countries', {
			templateUrl: './partials/countries/countries.html',
			controller : ''
		} ).when( '/country/capital', {
			templateUrl: './partials/country/country.html',
			controller : ''
		} ).otherwise( {
			redirectTo: '/'
		} )
	} )
	.controller( 'ccController', ['$scope', function ccController($scope) {

	}] );