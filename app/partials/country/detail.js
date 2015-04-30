angular.module( 'ccApp' ).controller( 'detailController',
	['$scope', 'cncData', '$q', '$route',
		function ($scope, cncData, $q, $route) {
			$route.current.params.city

			var detailCountry = $route.current.params.countryCode.toUpperCase();
			//Get the countries data if not already available:
			//This enables entering the app directly into a detail view.
			$q.when( cncData.countries ).then( function (result) {
				//If cncData.countries is still a promise...
				if (toString.call( cncData.countries ) == '[object Object]') {
					//...replace it with the returned array.
					cncData.countries = result.geonames;
					cncData.index = result.index;
				}
				$scope.country = cncData.countries[cncData.index[detailCountry]];
			} );
			$scope.flag = detailCountry.toLowerCase();
			$scope.map = detailCountry;
			cncData.getCapital( detailCountry ).then( function (result) {
				$scope.capital = result;
			} );
			cncData.getNeighbors( detailCountry ).then( function (result) {
				$scope.numNeighbors = result.totalResultsCount;
				$scope.neighborList = result.geonames;
			} );
		}] );