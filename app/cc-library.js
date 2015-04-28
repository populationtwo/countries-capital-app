angular.module( 'ccLibrary', [] )

	.constant( 'GEONAMES_API_PREFIX', 'http://api.geonames.org' )
	.constant( 'COUNTRY_INFO', '/countryInfoJSON?username={{username}}' )

	.factory('ccCountries', ['$location', '$http', '$q', '$interpolate', 'GEONAMES_API_PREFIX', 'COUNTRY_INFO',
		function($location, $http, $q, $interpolate, GEONAMES_API_PREFIX, COUNTRY_INFO){
			var countriesArr = null;
			function getCcList(){
				var path = $interpolate(GEONAMES_API_PREFIX + COUNTRY_INFO)({username: 'hanoman_sakti'});
				return $http.get(path, {cache:true})
			}

			return {
				getCcList: getCcList
			};
		}])

