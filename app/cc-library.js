angular.module( 'ccLibrary', [] )

	.constant( 'GEONAMES_API_PREFIX', 'http://api.geonames.org' )
	.constant( 'COUNTRY_INFO', '/countryInfoJSON' )
	.constant( 'USER', '?username=hanoman_sakti' )

	.service( 'ccCountries', ['$location', '$http', '$q', '$interpolate', 'GEONAMES_API_PREFIX', 'COUNTRY_INFO', 'USER',
		function ($location, $http, $q, $interpolate, GEONAMES_API_PREFIX, COUNTRY_INFO, USER) {

			this.getCcList = function () {
				var path = GEONAMES_API_PREFIX + COUNTRY_INFO + USER;
				return $http.get( path, {cache: true} )
			}

		}] )
