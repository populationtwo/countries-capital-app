angular.module( 'ccLibrary', [] )

	.constant( 'GEONAMES_API_PREFIX', 'http://api.geonames.org' )
	.constant( 'COUNTRY_INFO', '/countryInfoJSON?username={{username}}' )

	.factory('ccCountries', ['$location', '$http', '$q', '$interpolate', 'GEONAMES_API_PREFIX', 'COUNTRY_INFO',
		function($location, $http, $q, $interpolate, GEONAMES_API_PREFIX, COUNTRY_INFO){
			var _countries = null;

			function getCcList(){
				var path = $interpolate(GEONAMES_API_PREFIX + COUNTRY_INFO)({username: 'hanoman_sakti'});
				return $http.get(path, {cache:true})
					.success(function(data) {
						if(_countries === null){
							_countries = [];
							angular.forEach(data.geonames, function(country){
								_countries[country.countryCode] = country;
							});
						}
						console.log('get countries success')
					})
					.error(function(data, status){
						console.log('Error status: ' + status);
						$location.path('/error');
					});
			}

			return {
				getCcList: getCcList
			};
		}])

