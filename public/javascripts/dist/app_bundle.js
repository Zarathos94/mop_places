/**
 * Created by zarathos on 01/07/16.
 */
'use strict';

var mopApp = angular.module('mopPlaces', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ngMap'
]);

mopApp.constant('APP_CONFIG', {
    self: 'http://localhost'
});

////Notifications Growl Config
mopApp.config(['$compileProvider', function($compileProvider) {
    
    $compileProvider.debugInfoEnabled(false);
}]);
(function () {
    'use strict';
    mopApp.controller('indexController', ['$scope', 'RESTService', '$rootScope', function ($scope, RESTService, $rootScope) {

        $scope.clubList = [];
        $scope.barList = [];
        $scope.foodList = [];
        $scope.allList = [];
        

        $scope.getFood = function() {
            RESTService.request('http://localhost:3000/food', 'GET').then(function (response) {
                if(response.status == 200) {
                    $scope.foodList = response.data.foodList;
                    $rootScope.$broadcast('foodList', response.data.foodList);
                }
                else {

                }
            }, function (err) {

            });
        };
        

        $scope.getBars = function() {
            RESTService.request('http://localhost:3000/bars', 'GET').then(function (response) {
                if(response.status == 200) {
                    $scope.barList = response.data.barList;
                    $rootScope.$broadcast('barList', response.data.barList);
                }
                else {

                }
            }, function (err) {

            });
        };

        $scope.getClubs = function() {
            RESTService.request('http://localhost:3000/clubs', 'GET').then(function (response) {
                if(response.status == 200) {
                    $scope.clubList = response.data.clubList;
                    $rootScope.$broadcast('clubList', response.data.clubList);
                }
                else {

                }
            }, function (err) {

            });
        };

        $scope.getAll = function() {
            RESTService.request('http://localhost:3000/clubs', 'GET').then(function (clubs) {
                if(clubs.status == 200) {
                    RESTService.request('http://localhost:3000/bars', 'GET').then(function (bars) {
                        if(bars.status == 200) {
                            RESTService.request('http://localhost:3000/food', 'GET').then(function (food) {
                                if(food.status == 200) {
                                    $scope.allList = food.data.foodList.concat(bars.data.barList.concat(clubs.data.clubList));
                                    
                                    $rootScope.$broadcast('foodList', $scope.allList);
                                }
                                else {

                                }
                            }, function (err) {

                            });
                        }
                        else {

                        }
                    }, function (err) {

                    });
                }
                else {

                }
            }, function (err) {

            });
        };
        
        $scope.locate = function(lat, lon) {
            $rootScope.$broadcast('locate', {lat: lat, lon: lon});
        };
    }]);
})();
(function () {
    'use strict';
    mopApp.controller('mapController', ['$scope', 'NgMap', '$rootScope', function($scope, NgMap, $rootScope) {
        $scope.centerCoords = {
            lat: 43.8563,
            lon: 18.4131
        };
        $scope.zoom = 10;
        
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            //map.center = "43.8563, 18.4131";
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
            
        });

        $scope.$on('clubList', function(event, args) {
            
            if(event.name == 'clubList') {
                $scope.showList = args;
                
            }
        });

        $scope.$on('foodList', function(event, args) {

            if(event.name == 'foodList') {
                $scope.showList = args;

            }
        });

        $scope.$on('barList', function(event, args) {

            if(event.name == 'barList') {
                $scope.showList = args;

            }
        });
        
        $scope.$on('locate', function(event, args) {
            if(event.name == 'locate') {
                console.log(args);
                $scope.centerCoords = {
                    lat: args.lat,
                    lon: args.lon
                };
                $scope.zoom = 18;
                
            }
        });
    }]);

})();
/**
 * Created by zarathos on 02/07/16.
 */
(function() {

    'use strict';

    mopApp.factory('RESTService', ['$http', function($http) {

        return {
            request: function(url, method, body, params, headers) {
                method = method ? method : 'GET';
                params = params ? params : undefined;
                body = body ? body : undefined;

                return $http({
                    method: method,
                    url: url,
                    params: params,
                    data: body,
                    headers: headers
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(error) {
                    return error;
                });
            }
        };

    }]);


})();