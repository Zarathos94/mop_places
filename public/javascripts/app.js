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