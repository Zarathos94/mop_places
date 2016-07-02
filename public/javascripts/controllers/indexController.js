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