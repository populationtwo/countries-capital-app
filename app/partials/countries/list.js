angular.module('ccApp')
    .controller('listController', ['$scope', 'ccData', '$q', '$rootScope', '$location', '$route',
        function($scope, ccData, $q, $rootScope, $location, $route) {

            var toString = Object.prototype.toString;
            $rootScope.isLoading = true;

            //Bind the countries data onto $scope when it becomes available:
            $q.when(ccData.countries)
                .then(function(result) {
                    //If ccData.countries is still a promise...
                    if (toString.call(ccData.countries) == '[object Object]') {
                        //...replace it with the returned array.
                        ccData.countries = result.geonames;
                        ccData.index = result.index;
                    }
                    $scope.countries = ccData.countries;
                    $rootScope.isLoading = false;
                });
            $scope.countryDetail = function(countryCode) {
                $location.path('/countries/' + countryCode );
            }

        }
    ]);