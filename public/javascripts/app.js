/**
 * Created by zarathos on 01/07/16.
 */
'use strict';

var mopApp = angular.module('mopPlaces', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize'
]);

chApp.constant('APP_CONFIG', {
    self: 'http://localhost'
});

////Notifications Growl Config
chApp.config(['$compileProvider', function($compileProvider) {
    
    $compileProvider.debugInfoEnabled(false);
}]);