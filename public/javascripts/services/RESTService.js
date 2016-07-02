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