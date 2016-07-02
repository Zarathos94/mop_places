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