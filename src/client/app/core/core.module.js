(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngRoute', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'ngplus'
    ]);
})();
