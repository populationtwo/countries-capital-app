describe( 'ccLibrary', function () {
	beforeEach( function () {
		module( 'ccApp' );
	} );

	it( 'getCountries() query the Geonames.org api for countries data',
		inject( function ($httpBackend, $q, ccLibraryService) {
			$httpBackend.when( 'JSONP', 'http://api.geonames.org/countryInfoJSON?callback=JSON_CALLBACK&username=hanoman_sakti' )
				.respond( {
					geonames: [{key: 0}, {key: 1}, {key: 2}]
				} );
			var countries;
			$q.when( ccLibraryService.getCountries() ).then( function (result) {
				countries = result.geonames
			} );

			$httpBackend.flush();

			expect( countries.length ).toBe( 3 );

			$httpBackend.verifyNoOutstandingRequest();
		} ) );
} );