angular.module( 'ccApp' ).controller( 'listController',
	['$scope', 'cncData', '$q', '$rootScope',
		function ($scope, cncData, $q, $rootScope) {
			var toString = Object.prototype.toString;
			$rootScope.isLoading = true;
			//Bind the countries data onto $scope when it becomes available:
			$q.when( cncData.countries ).then( function (result) {
				//If cncData.countries is still a promise...
				if (toString.call( cncData.countries ) == '[object Object]') {
					//...replace it with the returned array.
					cncData.countries = result.geonames;
					cncData.index = result.index;
				}
				$scope.countries = cncData.countries;

				$rootScope.isLoading = false;
			} );
		}] );