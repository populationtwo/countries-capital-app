describe("ccApp", function() {

	beforeEach(function() {
		module('ccApp');
		inject(function(_$rootScope_,  _$injector_, $templateCache) {
			$rootScope = _$rootScope_;
			$injector = _$injector_;
			$templateCache.put('partials/countries/list.html', '');
			$templateCache.put('partials/country/detail.html', '');
			$templateCache.put('partials/home/home.html', '');
		});
	});

	describe("route config", function() {
		it('should load the template, controller and call the resolve',
			inject(function($route, $httpBackend, $rootScope, $route, $location) {
				$httpBackend.whenGET('partials/countries/list.html');
				$rootScope.$apply(function() {
					$location.path('/countries');
				});
				expect($route.current.controller).toBe("listController");
				expect($route.current.loadedTemplateUrl).toBe("partials/countries/list.html");

				$httpBackend.whenGET('partials/country/detail.html');
				$rootScope.$apply(function() {
					$location.path('/countries/:countryCode');
				});
				expect($route.current.controller).toBe("detailController");
				expect($route.current.loadedTemplateUrl).toBe("partials/country/detail.html");

				$httpBackend.whenGET('partials/home/home.html');
				$rootScope.$apply(function() {
					$location.path('/');
				});
				expect($route.current.loadedTemplateUrl).toBe("partials/home/home.html");

				$httpBackend.verifyNoOutstandingRequest();
				$httpBackend.verifyNoOutstandingExpectation();
			}));
	});

});

describe('ccData', function() {
	beforeEach(function() {
		module('ccApp');
		module(function($provide) {
			$provide.value('ccLibraryService', {
				getCountries: function() {return 'country'},
				getCapital: function(countryCode) {},
				getNeighbors: function(countryCode) {}
			});
		});
	});
	it('should return "Data" when called', function() {
		inject(function(ccData) {
			expect(ccData.countries).toEqual('country');
		})
	});
});