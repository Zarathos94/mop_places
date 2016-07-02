(function () {
    'use strict';
    mopApp.controller('mapController', ['$scope', 'NgMap', '$rootScope', function($scope, NgMap, $rootScope) {
        $scope.centerCoords = {
            lat: 43.8563,
            lon: 18.4131
        };
        $scope.zoom = 10;
        
        NgMap.getMap().then(function(map) {
            //console.log(map.getCenter());
            map.center = "43.8563, 18.4131";
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
            
        });

        $scope.$on('clubList', function(event, args) {
            
            if(event.name == 'clubList') {
                $scope.clubList = args;
                
            }
        });

        $scope.$on('foodList', function(event, args) {

            if(event.name == 'foodList') {
                $scope.foodList = args;

            }
        });

        $scope.$on('barList', function(event, args) {

            if(event.name == 'barList') {
                $scope.barList = args;

            }
        });
        
        $scope.$on('locate', function(event, args) {
            if(event.name == 'locate') {
                $scope.centerCoords = {
                    lat: args.lat,
                    lon: args.lon
                };
                $scope.zoom = 18;
                
            }
        })
    }]);

})();