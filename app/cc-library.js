angular.module( 'ccLibrary', [] )

	.constant( 'GEONAMES_API_PREFIX', 'http://api.geonames.org' )
	.constant( 'COUNTRY_INFO', '/countryInfoJSON' )
	.constant( 'USER', '?username=hanoman_sakti' )
	.constant( 'CC_SEARCH', '/searchJSON?q={{ q }}&country={{ country }}&name_equals={{name_equals }}&isNameRequired={{ isNameRequired }}' )
	.constant('CC_NEIGHBOURS', '/neighboursJSON?geonameId={{ geonameId }}')


	.service( 'ccCountries', ['$location', '$http', '$q', '$interpolate', 'GEONAMES_API_PREFIX', 'COUNTRY_INFO', 'USER',
		function ($location, $http, $q, $interpolate, GEONAMES_API_PREFIX, COUNTRY_INFO, USER) {
			var _countries = null;

			this.getCcList = function () {
				var path = GEONAMES_API_PREFIX + COUNTRY_INFO + USER;
				return $http.get( path, {cache: true} )
					.success( function (data) {
						if (_countries === null) {
							_countries = [];
							angular.forEach( data.geonames, function (country) {
								_countries[country.countryCode] = country;
							} );
						}
					} )
					.error( function (data, status) {
						console.log( 'Error status: ' + status );
						$location.path( '/error' );
					} );
			}

			this.getCcDetails = function (code) {
				var defer = $q.defer();
				defer.resolve( _countries[code] );
				return defer.promise;
			}

		}] )

	.factory( 'ccRequest', function ($http, $q, GEONAMES_API_PREFIX, USER) {
		return function (path) {
			var defer = $q.defer();

			$http.get( GEONAMES_API_PREFIX + path + USER )
				.success( function (data) {
					defer.resolve( data );
				} )
				.error( function (data, status) {
					console.log( 'Error status: ' + status );
					$location.path( '/error' );
				} );

			return defer.promise;
		}

	} )

	.factory( 'ccCapitalReq', ['$interpolate', 'ccRequest', 'CC_SEARCH',
		function ($interpolate, ccRequest, CC_SEARCH) {
			return function (code, name) {
				var path = $interpolate( CC_SEARCH )( {
					q             : name,
					country       : code,
					name_equals   : name,
					isNameRequired: false
				} );
				//console.log(path);
				return ccRequest( path );
			};
		}] )

	.factory('ccCapPopulation', function(){
		return function(data){
			var population = 0;
			for(var i=0; i<data.geonames.length; i++){
				if(data.geonames[i].fcodeName.indexOf('capital') > -1){
					population = data.geonames[i].population;
				}
			}
			return population;
		};
	})

	.factory('ccNeighborsReq', ['$interpolate', 'ccRequest', 'CC_NEIGHBOURS',
		function($interpolate, ccRequest, CC_NEIGHBOURS){
			return function(id){
				var path = $interpolate(CC_NEIGHBOURS)({
					geonameId: id

				});
				return ccRequest(path);
			};
		}])

	.factory('ccNeighbors', function(){
		return function(data){
			var neighbors = [];
			for(var i=0; i<data.geonames.length; i++){
				neighbors.push({
					countryCode: data.geonames[i].countryCode,
					countryName: data.geonames[i].countryName,
				});
			}
			return neighbors;
		};
	})