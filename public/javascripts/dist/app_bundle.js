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
    mopApp.controller('indexController', ['$scope', 'RESTService', function ($scope, RESTService) {

        $scope.clubList = [];
        $scope.barList = [];
        $scope.foodList = [];

        RESTService.request('http://localhost:3000/clubs', 'GET').then(function (response) {
            if(response.status == 200) {
                $scope.clubList = response.data.clubList;
            }
            else {
                
            }
        }, function (err) {
            
        });
    }]);
})();
(function () {
    'use strict';
    mopApp.controller('mapController', function(NgMap) {
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
            
        });
    });

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