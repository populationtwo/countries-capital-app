angular.module( 'ccApp' ).controller( 'listController',
	['$scope', 'cncData', '$q',
		function ($scope, cncData, $q) {
			var toString = Object.prototype.toString;
			//Bind the countries data onto $scope when it becomes available:
			$q.when( cncData.countries ).then( function (result) {
				//If cncData.countries is still a promise...
				if (toString.call( cncData.countries ) == '[object Object]') {
					//...replace it with the returned array.
					cncData.countries = result.geonames;
					cncData.index = result.index;
				}
				$scope.countries = cncData.countries;
			} );


		}] );