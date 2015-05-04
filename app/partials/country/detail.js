angular.module( 'ccApp' ).controller( 'detailController',
	['$scope', 'ccData', '$q', '$route',
		function ($scope, ccData, $q, $route) {
			$route.current.params.city

			var detailCountry = $route.current.params.countryCode.toUpperCase();
			//Get the countries data if not already available:
			//This enables entering the app directly into a detail view.
			$q.when( ccData.countries ).then( function (result) {
				//If ccData.countries is still a promise...
				if (toString.call( ccData.countries ) == '[object Object]') {
					//...replace it with the returned array.
					ccData.countries = result.geonames;
					ccData.index = result.index;
				}
				$scope.country = ccData.countries[ccData.index[detailCountry]];
			} );
			$scope.flag = detailCountry.toLowerCase();
			$scope.map = detailCountry;
			ccData.getCapital( detailCountry ).then( function (result) {
				$scope.capital = result;
			} );
			ccData.getNeighbors( detailCountry ).then( function (result) {
				$scope.numNeighbors = result.totalResultsCount;
				$scope.neighborList = result.geonames;
			} );
		}] );