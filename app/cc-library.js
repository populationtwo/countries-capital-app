angular.module( 'ccApp' ).service( 'ccLibraryService',
	['$http', '$q',
		function ($http, $q) {
			var username = "hanoman_sakti";
			var APIUrl = "http://api.geonames.org/";

			this.getCountries = function() {
				var d = $q.defer();
				var url = APIUrl + "countryInfoJSON";
				var request = {
					callback: 'JSON_CALLBACK',
					username: username
				};
				$http( {
					method: 'JSONP',
					url   : url,
					params: request,
					cache : true
				} ).success( function (data, status, headers, config) {
					if (typeof data.status == 'object') {
						console.log( "Encountered and error requesting country data: \r\n'" +
						data.status.message + "'" );
						d.reject( data.status );
					} else {
						//Creating a countries index value pair: countryCode,
						//index of the country in the countries array.
						data.index = {};
						for (i = 0; i < data.geonames.length; i++) {
							data.index[data.geonames[i].countryCode] = i;
						}
						//Return both the index object and countries array:
						d.resolve( data );
					}
				} ).error( function (data, status, headers, config) {
					console.log( status + " error attempting to access geonames.org." );
					d.reject();
				} );
				return d.promise;
			};

			this.getNeighbors = function(countryCode) {
				var d = $q.defer();
				var url = APIUrl + "neighboursJSON";
				var request = {
					callback: 'JSON_CALLBACK',
					country : countryCode,
					username: username
				};
				$http( {
					method: 'JSONP',
					url   : url,
					params: request,
					cache : true
				} ).success( function (data, status, headers, config) {
					d.resolve( data );
				} ).error( function (data, status, headers, config) {
					alert( status + " error attempting to access geonames.org." );
					d.reject();
				} );
				return d.promise;
			};

			this.getCapital = function(countryCode) {
				var d = $q.defer();
				var url = APIUrl + "searchJSON";
				var request = {
					callback : 'JSON_CALLBACK',
					q        : "capital",
					formatted: true,
					country  : countryCode,
					maxRows  : 1,
					username : username
				};
				$http( {
					method: 'JSONP',
					url   : url,
					params: request,
					cache : true
				} ).success( function (data, status, headers, config) {
					d.resolve( data.geonames[0] );
				} ).error( function (data, status, headers, config) {
					alert( status + " error attempting to access geonames.org." );
					d.reject();
				} );
				return d.promise;
			}

		}] );