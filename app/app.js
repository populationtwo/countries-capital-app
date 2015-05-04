var ccApp = angular.module('ccApp', ['ngAnimate', 'ngRoute']);
ccApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when("/", {
                templateUrl: "partials/home/home.html"
            })
            .when("/countries", {
                templateUrl: "partials/countries/list.html",
                controller: 'listController'
            })
            .when("/countries/:countryCode", {
                templateUrl: "partials/country/detail.html",
                controller: 'detailController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

ccApp.value('ccNavData', {
    current: null
});

ccApp.controller('appCtrl', ['cncData', '$scope',
	function(cncData, $scope) {
		$scope.version = cncData.version;
	}
]);

ccApp.controller('NavCtrl', ['$scope', 'ccNavData', function($scope, ccNavData){
    $scope.nav = ccNavData;
}]);
ccApp.factory('cncData', ['ccLibraryService',
    function(ccLibraryService) {
        var Data = {};
        //Evaluate the getCountries function immediately.
        Data.countries = ccLibraryService.getCountries();
        //These other methods require parameters.
        Data.getCapital = ccLibraryService.getCapital;
        Data.getNeighbors = ccLibraryService.getNeighbors;
        return Data;
    }
]);
ccApp.run(['$rootScope', '$timeout', 'ccNavData', function($rootScope, $timeout, ccNavData){
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre){
        ccNavData.current = current.$$route.originalPath;
    });
}]);
