angular.module('ccApp')
    .controller('listController', ['$scope', 'cncData', '$q', '$rootScope', '$location', '$route',
        function($scope, cncData, $q, $rootScope, $location, $route) {

            var toString = Object.prototype.toString;
            $rootScope.isLoading = true;

            //Bind the countries data onto $scope when it becomes available:
            $q.when(cncData.countries)
                .then(function(result) {
                    //If cncData.countries is still a promise...
                    if (toString.call(cncData.countries) == '[object Object]') {
                        //...replace it with the returned array.
                        cncData.countries = result.geonames;
                        cncData.index = result.index;
                    }
                    $scope.countries = cncData.countries;
                    $rootScope.isLoading = false;
                });
            $scope.countryDetail = function(countryCode) {
                $location.path('/countries/' + countryCode );
            }

        }
    ]);